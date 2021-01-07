import React from 'react'

const PetCardFull = ({id, pets}) => {
  return (
    <div className="pet__card">
      <img src={pets[id].photo} alt={pets[id].name} className="pet__card--photo"/>
      <div className="flex-col-1">
        <p className="pet__card--name">{pets[id].name}</p>
        <p className="pet__card--breed">
          {pets[id].breed} 
          <span className="pet__card--age">, {pets[id].age} ({pets[id].gender})</span> 
        </p>
        <p className="pet__card--weight">Weight: {pets[id].weight}</p>
        <p className="pet__card--weight">Height: {pets[id].height}</p>
        <p className="pet__card--weight">Color: {pets[id].color}</p>
      </div>
      <div className="flex-col-2">
        <p className="pet__card--date">Date Listed: 12/12/2020</p>
        <p className="pet__card--status">Hypoallergenic: {pets[id].hypoallegenic ? 'Yes' : 'No'}</p>
        <p className="pet__card--status">Dietary Restrictions: {pets[id].dietaryRestrictions}</p>
        <p className="pet__card--status">Status: <b>{pets[id].status}</b></p>
      </div>
    </div>
  )
}

export default PetCardFull
