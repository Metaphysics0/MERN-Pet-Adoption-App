import React, { useState } from 'react';
import { Image } from 'cloudinary-react';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const BASE_URL = `http://localhost:5000/api`;

const PetCard = ({ pet, profile, setProfile }) => {
  // Save pet to user profile
  const savePet = async () => {
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pet: pet.name, id: pet._id }),
    };
    try {
      const response = await fetch(`${BASE_URL}/savepet/${profile._id}`, settings);
      const data = await response.json();
      setProfile(data);
      if (data) setHeart(!heart);
    } catch (e) {
      console.log(e);
    }
  };

  const [heart, setHeart] = useState(false);

  return (
    <div className="pet__card">
      <Image
        className="pet__card--photo"
        cloudName="stillworld"
        publicId={pet.photo}
        alt={pet.name}
      />
      <div className="flex-col-1">
        <p className="pet__card--name">{pet.name}</p>
        <p className="pet__card--breed">
          {pet.breed}
          <span className="pet__card--age">
            , {pet.age} {pet.gender}
          </span>
        </p>
        <p className="pet__card--weight">Weight: {pet.weight}</p>
      </div>
      <div className="flex-col-2">
        <p className="pet__card--date">Date Listed: {pet.dateListed}</p>
        <p className="pet__card--status">Status: {pet.status}</p>
        <div className="flex-end">
          <div className={profile ? 'icon-container' : 'hidden'}>
            <button onClick={savePet} className="pet__card--icon">
              {profile.savedPets.some((e) => e.id === pet._id) ? (
                <FaHeart className="red" />
              ) : (
                <FiHeart />
              )}
              {/* {heart ? <FaHeart className="red" /> : <FiHeart /> } */}
            </button>
          </div>
          <Link to={`/petpage/${pet._id}`}>
            <button className="pet__card--btn">View More</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
