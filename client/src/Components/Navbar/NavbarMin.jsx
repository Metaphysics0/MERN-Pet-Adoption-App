import React from 'react'
import { Link } from 'react-router-dom'
import { GiSittingDog } from 'react-icons/gi'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="links-wrapper--signup">
        <Link className="navbar__logo--link" to="/">
          <h2 className="navbar__logo">PetCenter <GiSittingDog className="navbar__logo--icon"/> </h2>
        </Link>
          <Link to="/signup" className="navbar__link--signup">
            Create an account!
          </Link>
      </div>
    </nav>
  )
}

export default Navbar
