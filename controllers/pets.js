const Pet = require('../models/Pet');
const UserProfile = require('../models/UserProfile');

// Get list of pets
exports.pets = async (req, res) => {
  try {
    const pets = await Pet.find({});
    res.status(200).json(pets);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

// Find one pet
exports.getpet = async (req, res) => {
  try {
    const data = await Pet.findOne({ _id: req.params.id });
    res.status(200).json({ success: data });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

// Get user saved pets
exports.getsaved = async (req, res) => {
  try {
    const response = await Pet.find({ _id: { $in: req.body.savedPets } });
    res.status(200).json({ success: response });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

// Get users adopted pets
exports.getadopted = async (req, res) => {
  try {
    const response = await Pet.find({ _id: { $in: req.body.adoptedPets } });
    res.status(200).json({ success: response });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

// admin edit pet
exports.editpet = (req, res) => {
  Pet.findByIdAndUpdate(req.params.id, {});
};

// Adopt pet functionality!!
exports.adoptpet = async (req, res) => {
  try {
    const checkIfOwned = await UserProfile.findOne({ email: req.body.email });
    const findPet = await Pet.find({ _id: req.params.id });
    let result = checkIfOwned.adoptedPets.find((o) => o.id === req.params.id);
    if (result) {
      return res.status(409).json({ message: 'YOU ALREADY OWN THIS MOFOOOO' });
    } else if (findPet.status.toLowerCase().includes('adopted')) {
      return res.status(408).json({ message: 'THIS PET IS ALREADY ADOPTED' });
    } else {
      const updatePet = await Pet.findByIdAndUpdate(req.params.id, {
        status: `Adopted! by ${req.body.firstName} ${
          req.body.lastName
        } on ${new Date().toLocaleDateString()}`,
      });
      const updateUser = await UserProfile.findOneAndUpdate(
        { email: req.body.email },
        {
          $push: { adoptedPets: { pet: req.body.pet, id: req.params.id } },
        },
        { new: true, upsert: true }
      );
      return res.status(200).json({ updatePet, updateUser });
    }
  } catch (e) {
    return res.status(400).json(e);
  }
};
