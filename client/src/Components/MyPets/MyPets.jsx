import React, { useEffect, useState } from 'react'
import PetCardProfile from '../PetCard/PetCardProfile'
import Lion from './img/lion.gif'
const BASE_URL = `http://localhost:5000/api`

const MyPets = ({profile}) => {
  const [menuText, setMenuText] = useState('saved')
  const [savedPets, setSavedPets] = useState([])
  const [adoptedPets, setAdoptedPets] = useState([])

  // fetch user's saved pets 
  useEffect(() => {
    let newArr = []
    const storePets = () => {
      if (profile) {
        profile.savedPets.forEach(e => newArr.push(e.id))
      }
    }
    storePets()
    const getSavedPets = async () => {
      const settings = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
        body: JSON.stringify({savedPets: newArr})
      };
      try {
        const response = await fetch(BASE_URL + '/getsaved', settings)
        const data = await response.json()
        setSavedPets(data.success)
        return data
      } catch (e) {
        console.log(e)
      }
    }
    // Fetch adopted Pets
    let adoptArr = []
    const storeAdoptedPets = () => {
      if (profile) {
        profile.adoptedPets.forEach(e => adoptArr.push(e.id))
      }
    }
    storeAdoptedPets()
    const getAdoptedPets = async () => {
      const settings = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
        body: JSON.stringify({adoptedPets: adoptArr})
      };
      try {
        const response = await fetch(BASE_URL + '/getadopted', settings)
        const data = await response.json()
        setAdoptedPets(data.success)
      } catch (e) {
        console.error(e);
      }
    }
    getSavedPets()
    getAdoptedPets()
  }, [profile])

  const handleChange = (e) => {
    setMenuText(e.target.value)
  }

  return (
    <section className="my-pets">
      <aside className="flex-wrap">
        <div className="flex-col--w">
          <h3 className={ menuText === 'adopted' ? "my-pets__heading" : 'hidden'}>You have {profile ? profile.adoptedPets.length : 'some'} pet(s) adopted</h3>
          <h3 className={ menuText === 'saved' ? "my-pets__heading" : 'hidden'}>You have {profile ? profile.savedPets.length : 'some'} pet(s) saved</h3>
          <div className="flex-wrap-2">
            <h2 className="my-pets__subheading">{menuText} pets:</h2>
            <div className="my-pets__switch">
              <label className="my-pets--label">
                <input 
                  className="my-pets__radio" 
                  type="radio" 
                  name="toggle" 
                  value='saved'
                  onClick={handleChange}
                  defaultChecked
                />
                Saved
              </label>
              <label className="my-pets--label">
                <input 
                  className="my-pets__radio" 
                  type="radio" 
                  name="toggle" 
                  value='adopted'
                  onClick={handleChange}
                />
                Adopted/Foster
              </label>
            </div>
          </div>
          <div className={menuText === 'adopted' && 'hidden'}>
            {savedPets.map((pet) => (
              <PetCardProfile key={pet._id} pet={pet} />
            ))}
          </div>
          <div className={menuText === 'saved' && 'hidden'}>
            {adoptedPets.map((pet) => (
              <PetCardProfile key={pet._id} pet={pet} />
            ))}
          </div>
        </div>
        <div className="flex-col-3">
          <img className="my-pets__img" src={Lion} alt="lion" />
          <p className="my-pets__quote">“Until one has loved an animal, a part of one's soul remains unawakened.” <br></br> –Anatole France.</p>
        </div>
      </aside>
    </section>
  )
}

export default MyPets
