import React, {useState} from 'react'
import Modal from 'react-modal';
import { GiDogHouse } from 'react-icons/gi'
import { HiOutlineSearch } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import SignInModal from '../Modals/SignInModal';
Modal.setAppElement('#root')

const Home = ({setAuth}) => {
  const [modalIsOpen,setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!modalIsOpen);
  }
 
  return ( 
    <>
      <div className="home-wrapper">
        <header className="home">
          <div className="home__logo"></div>
          <button 
            onClick={toggleModal} 
            className="home__button--main">
              Log In <GiDogHouse />
          </button>
          <div className="button-wrapper">
            <Link to="/search">
            <button className="home__button">Search <HiOutlineSearch /></button>
            </Link>
            <span className="home__sign-up">New? &nbsp;
            <Link className="home__sign-up--link" to="/signup">Create an account!</Link> 
            </span>
          </div>
        </header>
        <div className="home__bottom">
          <h3 className="home__bottom--text">"PetCenter is a monumental achievement in pet adoption"</h3>
          <h3 className="home__bottom--quote">-Cesar Millan (Host of Dog Whisperer)</h3>
        </div>
      </div>
      <SignInModal modalIsOpen={modalIsOpen} toggleModal={toggleModal} setAuth={setAuth} />
    </>
  )
}

export default Home