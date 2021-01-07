import React from 'react'
import { RiCloseCircleLine } from 'react-icons/ri'
import Modal from 'react-modal'
import Zelda from './img/zelda.gif'


const AddPetModal = ({modalIsOpen, toggleModal}) => {
  return (
    <Modal isOpen={modalIsOpen} onRequestClose={toggleModal} className="modal">
      <h1 className="modal__heading">Pet successfully added!</h1>
      <img src={Zelda} alt="Success" className="modal__gif br-1"/>
      <button className="modal__form--close" onClick={toggleModal}>
        <RiCloseCircleLine className="modal__form--close-icon" />
      </button>
    </Modal>
  )
}

export default AddPetModal
