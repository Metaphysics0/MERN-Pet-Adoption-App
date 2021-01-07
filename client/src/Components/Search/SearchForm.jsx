import React from 'react'
import { useForm } from 'react-hook-form'
import { BrowserRouter as Router, Route, Switch, Link, NavLink } from 'react-router-dom'

const SearchForm = ({searchTerm, setSearchTerm}) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }
  
  return (
    <div className="search">
      <h3 className="search__heading">😸 SEARCH 🦁</h3>
      <Router>
      <form className="search__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex-row wide">
          <input 
            className="search__form--input" 
            type="text" 
            name="animal" 
            placeholder="Leopard Gecko..."
            value={searchTerm}
            onChange={handleChange}
          />
          <div className="flex-col">
            <button className="search__form--btn" type="submit">SEARCH</button>
            <NavLink 
              className="search__form--option" 
              to="/search-advanced" 
              activeStyle={{visibility: 'hidden'}}
            >
              Advanced Search
            </NavLink>
          </div>
        </div>
        <Switch>
          <Route path="/search-advanced">
            <select className="search__form--input" name="Adoption Status" ref={register}>
              <option className="grey" value="none" selected disabled hidden>(Adoption Status)</option>
              <option value="stray">Adopted</option>
              <option value="foster">Foster Care</option>
              <option value="pending">Status pending</option>
            </select>
            <input className="search__form--input" type="text" name="name" placeholder="Name" ref={register}/>
            <input className="search__form--input" type="number" name="age" placeholder="Age" ref={register}/>
            <input className="search__form--input" type="number" name="height" placeholder="Height" ref={register}/>
            <input className="search__form--input" type="number" name="weight" placeholder="Weight" ref={register}/>
            <Link className="search__form--option" to="/search">Basic Search</Link>
          </Route>
        </Switch>
      </form>
      </Router>
    </div>
  )
}

export default SearchForm
