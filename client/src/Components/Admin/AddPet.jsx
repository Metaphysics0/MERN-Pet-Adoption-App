import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import AddPetModal from '../Modals/AddPetModal';
const BASE_URL = `http://localhost:5000/api`;
Modal.setAppElement('#root');

const AddPet = ({ pets, setPets }) => {
  const { register, handleSubmit } = useForm();

  // Send form data to API
  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append('photoURL', data.photo[0]);
    formData.append('photo', data.photo[0].name);
    formData.append('name', data.name);
    formData.append('animal', data.type);
    formData.append('status', data.status);
    formData.append('age', data.age);
    formData.append('gender', data.gender);
    formData.append('height', data.height);
    formData.append('weight', data.weight);
    formData.append('color', data.color);
    formData.append('dietaryRestrictions', data.dietaryRestrictions);
    formData.append('hypoallegenic', data.hypoallegenic);
    formData.append('breed', data.breed);
    formData.append('bio', data.bio);

    const settings = { method: 'POST', body: formData };
    try {
      const fetchResponse = await fetch(`${BASE_URL}/addpet`, settings);
      const data = await fetchResponse.json();
      setPets([...pets, data[0]]);
      console.log(data);
      if (data) toggleModal();
    } catch (e) {
      return e;
    }
  };

  const [modalIsOpen, setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!modalIsOpen);
  }

  return (
    <>
      <div className="home-wrapper">
        <header className="home wide">
          <h3 className="home__heading--admin">Create a pet</h3>
          <form
            className="admin-form"
            encType="multipart/form-data"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex-row mb">
              <h3 className="admin-form--label">Animal Type:</h3>
              <label className="admin-form--radio">
                <input className="ml" name="animal" type="radio" value="dog" ref={register} />
                Dog
              </label>
              <label className="admin-form--radio">
                <input className="ml" name="animal" type="radio" value="cat" ref={register} />
                Cat
              </label>
            </div>
            <label className="admin-form--label">
              Name:
              <input
                type="text"
                name="name"
                className="admin-form__input"
                placeholder="Name (i.e. Ollie)"
                ref={register}
              />
            </label>
            <label className="admin-form--label">
              Breed:
              <input
                type="text"
                name="breed"
                className="admin-form__input"
                placeholder="Breed (i.e. Boston Terrier)"
                ref={register}
              />
            </label>
            <label className="admin-form--label">
              Gender:
              <select className="admin-form__input" name="gender" ref={register}>
                <option className="grey" value="none" selected disabled>
                  (Gender)
                </option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </label>
            <label className="admin-form--label">
              Status:
              <input
                type="text"
                name="status"
                className="admin-form__input"
                placeholder="Adoption Status"
                ref={register}
              />
            </label>
            <label className="admin-form--label">
              Age:
              <input
                type="number"
                name="age"
                placeholder="Age"
                className="admin-form__input"
                ref={register}
              />
            </label>
            <label className="admin-form--label">
              Weight:
              <input
                type="number"
                name="weight"
                placeholder="Weight (lbs.)"
                className="admin-form__input"
                ref={register}
              />
            </label>
            <label className="admin-form--label">
              Height:
              <input
                type="number"
                name="height"
                placeholder="Height (in.)"
                className="admin-form__input"
                ref={register}
              />
            </label>
            <label className="admin-form--label">
              Color:
              <input
                type="text"
                name="color"
                placeholder="Color (i.e. Black, spots)"
                className="admin-form__input"
                ref={register}
              />
            </label>
            <div className="flex-row mb-1">
              <h3 className="admin-form--label mb-0">Hypoallegenic:</h3>
              <label className="admin-form--radio">
                <input
                  className="ml"
                  name="hypoallegenic"
                  type="radio"
                  value={true}
                  ref={register}
                />
                Yes
              </label>
              <label className="admin-form--radio">
                <input
                  className="ml"
                  name="hypoallegenic"
                  type="radio"
                  value={false}
                  ref={register}
                />
                No
              </label>
            </div>
            <label className="admin-form--label">
              Diet:
              <input
                type="text"
                name="dietaryRestrictions"
                placeholder="Dietary Restrictions? (i.e. Vegan, Keto)"
                className="admin-form__input"
                ref={register}
              />
            </label>
            <label className="admin-form--label">
              Bio:
              <textarea
                name="bio"
                className="admin-form__input rs-0"
                ref={register}
                placeholder="Ollie is a warm and loving boston terrier seeking the home of a new owner. He likes to cuddle, play fetch, and sleep."
              ></textarea>
            </label>
            <label className="admin-form--label">
              Profile Picture:
              <input type="file" name="photo" className="admin-form__file" ref={register} />
            </label>
            <button type="submit" className="profile-form__btn mv">
              Submit
            </button>
          </form>
          <Link to="/admin">Return to admin</Link>
        </header>
      </div>
      <AddPetModal modalIsOpen={modalIsOpen} toggleModal={toggleModal} />
    </>
  );
};

export default AddPet;
