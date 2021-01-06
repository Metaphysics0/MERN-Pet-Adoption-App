// USER PROFILE ROUTES
const UserProfile = require('../models/UserProfile');

// Edit user profile API
exports.edit = async (req, res) => {
  try {
    const response = await UserProfile.findByIdAndUpdate(req.params.id, req.body, {
      upsert: true,
      new: true,
    });
    res.status(200).json({ success: response });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

// Get current user profile
exports.user = async (req, res) => {
  try {
    const profile = await UserProfile.find({ email: req.params.id });
    res.status(200).json({ success: profile });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

// Save pet conditionally
exports.savepet = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ _id: req.params.id });
    let check = profile.savedPets.find((o) => o.id === req.body.id);
    if (check) {
      profile.savedPets.pull(check);
    } else {
      profile.savedPets.addToSet({ pet: req.body.pet, id: req.body.id });
    }
    profile.save();
    res.send(profile);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

// Get the full pet object of each user's saved pets
exports.getsaved = async (req, res) => {
  try {
    const data = await UserProfile.aggregate([
      { $match: { savedPets: req.body.savedPets[0].id } },
      {
        $lookup: {
          from: 'pets',
          localField: 'savedPets',
          foreignField: '_id',
          as: 'pets',
        },
      },
    ]);
    res.send(data);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};
