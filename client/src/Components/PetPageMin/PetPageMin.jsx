import React, { useState } from 'react'
import Modal from 'react-modal';
import NoFace from '../PetPage/img/noface.gif'
import PetCardFull from '../PetCard/PetCardFull';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import {FaShoppingBasket} from 'react-icons/fa'
import {BsPlusCircle} from 'react-icons/bs'
import { HiOutlineSearch } from 'react-icons/hi';
import AlertModal from '../Modals/AlertModal';
Modal.setAppElement('#root')

const PetPage = ({pets}) => {
  let { id } = useParams();
  let index = pets.findIndex(x => x._id === id.toString())

  const [modalIsOpen,setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!modalIsOpen);
  }


  return (
    <div className="pet-page">
      <div className="pet-page__left">
        <img className="pet-page__img" src={NoFace} alt="NoFace"/>
        <p className="pet-page__quote">“The creatures outside looked from pig to man, and from man to pig, and from pig to man again; but already it was impossible to say which was which.”
― George Orwell</p>
      </div>
      <div className="pet-page__right">
        <h2 className="pet-page__heading">"{pets[index].name}" - Pet Profile</h2>
        <PetCardFull pets={pets} id={index} />
        <div className="bio-wrapper">
          <h2 className="pet-page__subheading">Bio</h2>
          <p className="pet-page__bio">“{pets[index].bio}”</p>
        </div>
        <button className="pet-page__adopt" onClick={toggleModal}>ADOPT <FaShoppingBasket /></button>
        <div className="button-wrapper col-end">
          <Link to="/search">
            <button className="pet-page__btn">Search <HiOutlineSearch /></button>
          </Link>
          <button className="pet-page__btn" onClick={toggleModal}>Save <BsPlusCircle /></button>
        </div>
      </div>
      <AlertModal modalIsOpen={modalIsOpen} toggleModal={toggleModal} />
    </div>
  )
}

export default PetPage
