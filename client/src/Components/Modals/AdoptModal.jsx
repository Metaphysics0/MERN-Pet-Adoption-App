import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaShoppingBasket } from 'react-icons/fa';
const BASE_URL = `http://localhost:5000/api`;

const AdoptModal = ({
  modalIsOpen,
  toggleModal,
  toggleModalRefresh,
  petImg,
  petBreed,
  id,
  petName,
  profile,
}) => {
  const [error, setError] = useState();
  const [message, setMessage] = useState();

  // Adopt pet functionality
  const adoptPet = async () => {
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: profile.email,
        firstName: profile.firstName,
        lastName: profile.lastName,
        pet: petName,
      }),
    };
    try {
      const response = await fetch(BASE_URL + '/adopt/' + id, settings);
      if (response.status === 409) {
        setError(ErrorText);
      } else if (response.status === 408) {
        setError(ErrorText2);
      }
      const data = await response.json();
      setMessage(SuccessText);
      setTimeout(() => window.location.reload(), 1000);
      // window.location.reload();
      return data;
    } catch (e) {
      return e;
    }
  };

  const ErrorText = <p className="modal__text--error">You already have this pet adopted!</p>;
  const ErrorText2 = <p className="modal__text--error">Someone already owns this pet</p>;
  const SuccessText = (
    <>
      <p className="modal__text--success">Congratulations!! Pet Successfully adopted.</p>
    </>
  );

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={toggleModal} className="modal">
      <div className="flex-col-1">
        <h1 className="modal__heading">Are you sure you have what it takes?</h1>
        <img src={petImg} alt="pet" className="modal__img" />
        <p className="modal__text mb-1">{petBreed}s require a lot of attention and care!!</p>
        {error}
        {message}
        <div className="button-wrapper">
          <button className="profile-form__sign-out" onClick={toggleModal}>
            Close
          </button>
          <button className="pet-page__adopt ml-2" onClick={adoptPet}>
            ADOPT <FaShoppingBasket />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AdoptModal;
