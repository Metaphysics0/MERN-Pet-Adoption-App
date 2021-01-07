import React from 'react';
import { FaPaw } from 'react-icons/fa';
import Doggos from './cropped.gif';
import { Link } from 'react-router-dom';

export const HomeFull = ({ profile }) => {
  if (profile)
    return (
      <>
        <div className="home-wrapper">
          <header className="home">
            <div className="home__logo mb-0"></div>
            <img className="home__gif" src={Doggos} alt="doggy" />
            <div className="button-wrapper">
              <Link to="/search">
                <button className="home__button">Search </button>
              </Link>
              <Link to="/mypets">
                <button className="home__button--main">
                  My Pets <FaPaw />
                </button>
              </Link>
              <span className="home__sign-up">
                <Link className="home__sign-up--link" to="/settings">
                  Profile!
                </Link>
              </span>
            </div>
          </header>
          <div className="home__bottom">
            <h3 className="home__bottom--text bold">
              Welcome{' '}
              <span className="text--underline">
                {(profile.firstName || '') + ' ' + (profile.lastName || '')}
              </span>
              <br></br>I hope you enjoy the app that I built!
            </h3>
            <h3 className="home__bottom--quote ">-Ryan Roberts (Creater of PetCenter)</h3>
          </div>
        </div>
      </>
    );
  else {
    return (
      <div>
        <h1>LOADING!!!!</h1>
      </div>
    );
  }
};
