import React from 'react'
import { Image } from 'cloudinary-react'
import { Link } from 'react-router-dom'
const BASE_URL = `http://localhost:5000/api/`

const PetCardProfile = ({pet, profile}) => {

  return (
    <div className="pet__card">
      <Image 
        className="pet__card--photo" 
        cloudName='stillworld' 
        publicId={pet.photo}
        alt={pet.name} 
      />
      <div className="flex-col-1">
        <p className="pet__card--name">{pet.name}</p>
        <p className="pet__card--breed">
          {pet.breed} 
          <span className="pet__card--age">, {pet.age} {pet.gender}</span> 
        </p>
        <p className="pet__card--weight">Weight: {pet.weight}</p>
      </div>
      <div className="flex-col-2">
        <p className="pet__card--date">Date Listed: {pet.dateListed}</p>
        <p className="pet__card--status">Status: {pet.status}</p>
        <div className="flex-end">
          <Link to={`/petpage/${pet._id}`}>
            <button className="pet__card--btn">View More</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PetCardProfile
