import React from 'react';
import { useForm } from 'react-hook-form';
import { GiMeditation } from 'react-icons/gi';
import { useHistory } from 'react-router-dom';
const BASE_URL = 'http://localhost:5000/api';

const ProfileForm = ({ setAuth, profile, setProfile, toggleModal }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      phone: profile.phone,
      bio: profile.bio || '',
    },
  });

  // Strip out all values with empty strings
  function removeEmptyFields(data) {
    Object.keys(data).forEach((key) => {
      if (data[key] === '' || data[key] == null) {
        delete data[key];
      }
    });
  }

  // Send form data for profile update
  const onSubmit = async (data) => {
    removeEmptyFields(data);
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      const fetchResponse = await fetch(`${BASE_URL}/edit/${profile._id}`, settings);
      const data = await fetchResponse.json();
      setProfile((prevState) => ({ ...prevState, ...data }));
      console.log('UPDATED PROFILE: ', profile);
      toggleModal();
    } catch (e) {
      return e;
    }
  };

  // Sign out and redirect to HomePage
  const history = useHistory();
  const signOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    setAuth(null);
    return history.push('/');
  };

  return (
    <>
      <form className="profile-form" onSubmit={handleSubmit(onSubmit)}>
        <label className="profile-form__label">Name:</label>
        <div className="names">
          <input
            className="profile-form__input"
            type="text"
            name="firstName"
            placeholder="First Name"
            ref={register}
          />
          <input
            className="profile-form__input"
            type="text"
            name="lastName"
            placeholder="Last Name"
            ref={register}
          />
        </div>
        <label className="profile-form__label">Phone:</label>
        <input
          className="profile-form__input"
          type="number"
          name="phone"
          placeholder="Phone"
          ref={register}
        />
        <label className="profile-form__label">Bio:</label>
        <textarea
          className="profile-form__input area"
          name="bio"
          placeholder="Talk about yourself"
          ref={register}
        ></textarea>
        <button className="profile-form__btn" type="submit">
          {' '}
          <span className="center-flex-1">
            Save Changes <GiMeditation className="icon" />
          </span>
        </button>
        <button onClick={signOut} className="profile-form__sign-out">
          Sign Out
        </button>
      </form>
    </>
  );
};

export default ProfileForm;
