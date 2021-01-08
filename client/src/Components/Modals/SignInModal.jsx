import React from 'react';
import { useForm } from 'react-hook-form';
import { FaPaw } from 'react-icons/fa';
import { RiCloseCircleLine } from 'react-icons/ri';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

const SignIn = ({ modalIsOpen, toggleModal, setAuth }) => {
  const { register, handleSubmit, errors } = useForm();
  const BASE_URL = 'https://mern-pet-app.herokuapp.com/api';

  // Send form data for validation
  const onSubmit = async (data) => {
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      const fetchResponse = await fetch(`${BASE_URL}/signin`, settings);
      const data = await fetchResponse.json();
      console.log('PROFILE: ', data);
      localStorage.setItem('login', JSON.stringify(data));
      setAuth(data);
    } catch (e) {
      return e;
    }
  };

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={toggleModal} className="modal">
      <form className="modal__form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="modal__heading">
          Please enter an Email and a Password <FaPaw />{' '}
        </h2>
        {errors.email && <span className="modal__form--msg">Please enter an email</span>}
        <input
          className="modal__form"
          type="email"
          name="email"
          placeholder="Email"
          ref={register({ required: true })}
        />
        {errors.password && <span className="modal__form--msg">This field is required!</span>}
        <input
          type="password"
          placeholder="Password"
          name="password"
          ref={register({ required: true })}
        />
        <span className="modal__form--check">
          Forgot Password? <Link to="/">Click Here</Link>
        </span>
        <button className="modal__form--btn" type="submit">
          ENTER
        </button>
      </form>
      <button className="modal__form--close" onClick={toggleModal}>
        <RiCloseCircleLine className="modal__form--close-icon" />
      </button>
    </Modal>
  );
};

export default SignIn;
