import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import NoFace2 from './img/NoFace2.gif';

export const UpdateModal = ({ modalIsOpen, toggleModal }) => {
  return (
    <Modal isOpen={modalIsOpen} onRequestClose={toggleModal} className="modal">
      <div className="modal__form">
        <h2 className="modal__heading">Profile information Successfully updated!</h2>
        <img src={NoFace2} alt="Success" className="modal__gif br-1" />
        <button className="modal__form--btn">
          <Link className="react-link" to="/settings" onClick={() => window.location.reload()}>
            Return
          </Link>
        </button>
      </div>
    </Modal>
  );
};
