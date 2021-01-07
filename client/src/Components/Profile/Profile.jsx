import React, { useState } from 'react';
import Modal from 'react-modal';
import { UpdateModal } from '../Modals/UpdateModal';
import ProfileForm from './ProfileForm';
import Totorro from './img/totorro.gif';
import { GiAquarium } from 'react-icons/gi';
import { AiOutlinePhone } from 'react-icons/ai';
Modal.setAppElement('#root');

const Settings = ({ setAuth, profile, setProfile }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!modalIsOpen);
  }
  if (profile) {
    return (
      <>
        <div className="grid">
          <main className="grid__main">
            <div className="main-container">
              <h2 className="grid__main--heading">⛰ Profile Settings 🌋</h2>
              <ProfileForm
                toggleModal={toggleModal}
                setAuth={setAuth}
                profile={profile}
                setProfile={setProfile}
              />
              <p className="grid__main--quote">
                “The greatness of a nation and its moral progress can be judged by the way its
                animals are treated.” ― Mahatma Gandhi
              </p>
            </div>
          </main>
          <div className="grid__bio">
            <div className="bio-container">
              <h2 className="grid__bio--name">
                {profile.firstName || ''} {profile.lastName || ''}
              </h2>
              <h2 className="grid__bio--phone">
                <span className="center-icon">
                  Phone: {profile.phone} <AiOutlinePhone className="icon-md" />
                </span>
              </h2>
              <h3 className="grid__bio--subheading">
                {' '}
                <span className="center-icon">
                  Bio <GiAquarium className="ml-1" />
                </span>
              </h3>
              <p className="grid__bio--bio">{profile.bio}</p>
            </div>
          </div>
          <div className="grid__picture">
            <img className="grid__picture--img" src={Totorro} alt="fun" />
          </div>
        </div>
        <UpdateModal modalIsOpen={modalIsOpen} toggleModal={toggleModal} />
      </>
    );
  } else {
    return (
      <div>
        <h1>LOADING!!!!!!</h1>
      </div>
    );
  }
};

export default Settings;
