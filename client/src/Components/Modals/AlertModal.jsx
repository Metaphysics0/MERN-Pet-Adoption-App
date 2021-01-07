import React from 'react'
import { RiCloseCircleLine } from 'react-icons/ri'
import Knight from './img/cropped.gif'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'

const AlertModal = ({modalIsOpen, toggleModal}) => {
  return (
    <Modal isOpen={modalIsOpen} onRequestClose={toggleModal} className="modal">
      <div className="flex-col-1">
        <h1 className="modal__alert">You need an account to access this feature!!!</h1>
        <img src={Knight} alt="dark souls" className="modal__gif"/>
          <button className="modal__form--btn" type="submit"><Link className="react-link" to="/signup">Sign Up</Link></button>
      </div>
      <button className="modal__form--close" onClick={toggleModal}>
        <RiCloseCircleLine className="modal__form--close-icon" />
      </button>
    </Modal>
  )
}

export default AlertModal
