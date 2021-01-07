import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import PetCardEdit from './PetCardEdit';
import DMT from './img/dmt2.gif';

const EditPet = ({ pets }) => {
  let { id } = useParams();
  let index = pets.findIndex((x) => x._id === id.toString());

  if (pets.length >= 1) {
    return (
      <div className="pet-page">
        <div className="pet-page__left flex-col-1">
          <img className="pet-page__img pulse" src={DMT} alt="Africa" />
          <p className="pet-page__quote">
            “I sometimes think that God in creating man somewhat overestimated his ability.”
            <br></br>― Oscar Wilde
          </p>
          <Link to="/admin">
            <button className="pet-page__btn">Return &crarr;</button>
          </Link>
        </div>
        <div className="pet-page__right">
          <h2 className="pet-page__heading">
            <em>"{pets[index].name}"</em> - Admin Pet Page
          </h2>
          <PetCardEdit pets={pets} id={index} />
          <div className="bio-wrapper">
            <h2 className="pet-page__subheading">Bio</h2>
            <p className="pet-page__bio">“{pets[index].bio}”</p>
          </div>
          <button type="submit" className="pet-page__adopt">
            SAVE CHANGES
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>LOADING!!!</h1>
      </div>
    );
  }
};

export default EditPet;
