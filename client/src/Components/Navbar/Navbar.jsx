import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { GiSittingDog } from 'react-icons/gi'
import { FiSettings } from 'react-icons/fi'

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link className="navbar__logo--link" to="/">
        <h2 className="navbar__logo">PetCenter <GiSittingDog className="navbar__logo--icon"/> </h2>
      </Link>
      <div className="links-wrapper">
        <NavLink className="navbar__link" activeClassName="navbar__link--active" to="/search">Search</NavLink>
        <NavLink className="navbar__link" activeClassName="navbar__link--active" to="/mypets">My Pets </NavLink>
        <NavLink className="navbar__link" activeClassName="navbar__link--active" to="/settings"><FiSettings className="navbar__link--icon" /></NavLink>
      </div>
    </nav>
  )
}

export default Navbar
