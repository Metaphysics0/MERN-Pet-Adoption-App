import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from '../Home/Home'
import SignUp from '../Home/SignUp'
import NavbarMin from '../Navbar/NavbarMin'
import PetPageMin from '../PetPageMin/PetPageMin'
import NoMatch from './404/404'
import SearchMin from '../Search/SearchMin'

const Register = ({setAuth, pets}) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home setAuth={setAuth} />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/search">
          <NavbarMin />
          <SearchMin pets={pets} />
        </Route>
        <Route path="/petpage/:id">
          <NavbarMin />
          <PetPageMin pets={pets} />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  )
}

export default Register
