import React, { useState } from 'react';
import SearchForm from './SearchForm';
import PetCard from '../PetCard/PetCard';

const Search = ({ pets, profile, setProfile }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Dynamic Search
  const results = !searchTerm
    ? pets
    : pets.filter(
        (pet) =>
          pet.breed.toLowerCase().includes(searchTerm) ||
          pet.name.toLowerCase().includes(searchTerm) ||
          pet.breed.includes(searchTerm) ||
          pet.name.includes(searchTerm)
      );

  if (pets && profile) {
    return (
      <>
        <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="pet-container">
          <div className="pet-container--content">
            {results.map((pet, index) => (
              <PetCard key={index} pet={pet} profile={profile} setProfile={setProfile} />
            ))}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div>
        <h1>LOADING!!!</h1>
      </div>
    );
  }
};

export default Search;
