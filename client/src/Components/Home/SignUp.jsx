import React, { useRef, useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { HiOutlineKey, HiOutlineMail, HiOutlineUserCircle } from 'react-icons/hi';
import { Si1Password } from 'react-icons/si';
import { FiPhone } from 'react-icons/fi';
import { FaUserPlus } from 'react-icons/fa';
import { SuccessModal } from '../Modals/SuccessModal';
Modal.setAppElement('#root');
const BASE_URL = 'http://localhost:5000/api';

const SignUp = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!modalIsOpen);
  }

  // Form verification
  const { register, errors, handleSubmit, watch } = useForm({});
  const password = useRef({});
  password.current = watch('password', '');

  // Send form data to server
  const onSubmit = async (formData) => {
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };
    try {
      const fetchResponse = await fetch(`${BASE_URL}/signup`, settings);
      const data = await fetchResponse.json();
      console.log(data);
      toggleModal();
      return data;
    } catch (e) {
      return e;
    }
  };

  return (
    <>
      <div className="home-wrapper">
        <header className="home">
          <div className="home__logo--small"></div>
          <h3 className="home__heading">Create an account!</h3>
          <form className="home__form" onSubmit={handleSubmit(onSubmit)}>
            {errors.email && <p className="home__form--error">{errors.email.message}</p>}
            <div className="home__form--field">
              <HiOutlineMail className="home__form--icon" />
              <input
                className="home__form--input"
                type="email"
                placeholder="Email"
                name="email"
                ref={register({
                  required: 'You must enter an email',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address!',
                  },
                })}
              />
            </div>
            {errors.password && <p className="home__form--error">{errors.password.message}</p>}
            <div className="home__form--field">
              <HiOutlineKey className="home__form--icon" />
              <input
                className="home__form--input"
                type="password"
                name="password"
                placeholder="Password"
                ref={register({
                  required: 'You must specify a password',
                  minLength: {
                    value: 8,
                    message: 'Password must have at least 8 characters',
                  },
                })}
              />
            </div>
            {errors.password_confirmation && (
              <p className="home__form--error">{errors.password_confirmation.message}</p>
            )}
            <div className="home__form--field">
              <Si1Password className="home__form--icon" />
              <input
                className="home__form--input"
                type="password"
                name="password_confirmation"
                placeholder="Confirm Password"
                ref={register({
                  validate: (value) => value === password.current || 'The passwords do not match',
                })}
              />
            </div>
            {errors.phone && <p className="home__form--error">{errors.phone.message}</p>}
            <div className="home__form--field">
              <FiPhone className="home__form--icon" />
              <input
                className="home__form--input"
                type="text"
                placeholder="Phone"
                name="phone"
                ref={register({
                  required: true,
                })}
              />
            </div>
            {errors.firstName && <p className="home__form--error">{errors.firstName.message}</p>}
            <div className="home__form--field">
              <HiOutlineUserCircle className="home__form--icon" />
              <input
                className="home__form--input"
                type="text"
                placeholder="First Name"
                name="firstName"
                ref={register({
                  required: 'You must enter a first name!',
                  maxLength: {
                    value: 20,
                    message: "Can't exceed 20 characters!",
                  },
                })}
              />
            </div>
            {errors.lastName && <p className="home__form--error">{errors.lastName.message}</p>}
            <div className="home__form--field">
              <HiOutlineUserCircle className="home__form--icon" />
              <input
                className="home__form--input"
                type="text"
                placeholder="Last Name"
                name="lastName"
                ref={register({
                  required: 'Last names are required!',
                  maxLength: {
                    value: 20,
                    message: "Can't exceed 20 characters!",
                  },
                })}
              />
            </div>
            <button className="home__button--signup" type="submit">
              Create Account <FaUserPlus />
            </button>
          </form>
          <Link to="/">Return to home</Link>
        </header>
      </div>
      <SuccessModal modalIsOpen={modalIsOpen} toggleModal={toggleModal} />
    </>
  );
};

export default SignUp;
