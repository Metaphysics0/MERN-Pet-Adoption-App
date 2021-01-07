import React from 'react'
import { useLocation } from 'react-router';
import LoFi from './lofi.gif'
import { Link } from 'react-router-dom';

const NoMatch = () => {
  let location = useLocation();

  return (
    <div className="no-match">
      <h1 className="no-match__text">Cannot find <code>{location.pathname}</code> 💔</h1>
      <img className="no-match__gif" src={LoFi} alt="lofi"/>
      <Link to="/">
        <button className="no-match__btn">Return</button>
      </Link>
    </div>
  )
}

export default NoMatch
