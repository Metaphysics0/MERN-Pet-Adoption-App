import React, { useState } from 'react'
import SearchForm from './SearchForm'
import PetCardMin from '../PetCard/PetCardMin'

const SearchMin = ({pets}) => {
  const [searchTerm, setSearchTerm] = useState('')

  // Dynamic Search
  const results = !searchTerm 
    ? pets 
    : pets.filter(pet => 
      pet.breed.toLowerCase().includes(searchTerm) ||
      pet.name.toLowerCase().includes(searchTerm) ||
      pet.breed.includes(searchTerm) ||
      pet.name.includes(searchTerm)
    )

  return (
    <>
      <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="pet-container">
        <div className="pet-container--content">
          {results.map((pet, index) => (
            <PetCardMin
              key={index}
              pet={pet}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default SearchMin
