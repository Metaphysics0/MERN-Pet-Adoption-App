import React, { useState } from 'react';
import NoFace from './img/noface.gif';
import PetCardFull from '../PetCard/PetCardFull';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { FaLock, FaPeopleCarry, FaShoppingBasket } from 'react-icons/fa';
import { BsPlusCircle } from 'react-icons/bs';
import { HiOutlineSearch } from 'react-icons/hi';
import { ToastContainer, toast } from 'react-toastify';
import AdoptModal from '../Modals/AdoptModal';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
Modal.setAppElement('#root');

const PetPage = ({ pets, profile }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!modalIsOpen);
  }
  function toggleModalRefresh() {
    setIsOpen(!modalIsOpen);
    window.location.reload();
  }

  let { id } = useParams();
  let index = pets.findIndex((x) => x._id === id.toString());
  const checkIfAdopted = pets[index].status.toLowerCase().includes('adopted');
  const notify = () => toast.success(`   Pet saved! ❤️`);

  return (
    <>
      <div className="pet-page">
        <div className="pet-page__left">
          <img className="pet-page__img" src={NoFace} alt="NoFace" />
          <p className="pet-page__quote">
            “The creatures outside looked from pig to man, and from man to pig, and from pig to man
            again; but already it was impossible to say which was which.” ― George Orwell
          </p>
        </div>
        <div className="pet-page__right">
          <h2 className="pet-page__heading">"{pets[index].name}" - Pet Profile</h2>
          <PetCardFull pets={pets} id={index} />
          <div className="bio-wrapper">
            <h2 className="pet-page__subheading">Bio</h2>
            <p className="pet-page__bio">“{pets[index].bio}”</p>
          </div>
          <div className="button-wrapper">
            <button
              onClick={toggleModal}
              className={checkIfAdopted ? 'pet-page__adopt disabled' : 'pet-page__adopt'}
              disabled={checkIfAdopted}
            >
              {checkIfAdopted ? (
                <>
                  ADOPTED <FaLock />
                </>
              ) : (
                <>
                  ADOPT <FaShoppingBasket />{' '}
                </>
              )}
            </button>
            <button className="pet-page__adopt bg-orange">
              Foster <FaPeopleCarry />{' '}
            </button>
          </div>
          <div className="button-wrapper col-end">
            <Link to="/search">
              <button className="pet-page__btn">
                Search <HiOutlineSearch />
              </button>
            </Link>
            <button onClick={notify} className="pet-page__btn">
              Save <BsPlusCircle />
            </button>
          </div>
        </div>
      </div>
      <ToastContainer className="fs-1" />
      <AdoptModal
        modalIsOpen={modalIsOpen}
        toggleModal={toggleModal}
        toggleModalRefresh={toggleModalRefresh}
        petImg={pets[index].photo}
        petBreed={pets[index].breed}
        petName={pets[index].name}
        id={id}
        profile={profile}
      />
    </>
  );
};

export default PetPage;
