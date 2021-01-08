import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from '../Home/SignUp';
import MyPets from '../MyPets/MyPets';
import Search from '../Search/Search';
import Profile from '../Profile/Profile';
import Navbar from '../Navbar/Navbar';
import PetPage from '../PetPage/PetPage';
import { HomeFull } from '../Home/HomeFull';
import NoMatch from './404/404';
const BASE_URL = 'https://mern-pet-app.herokuapp.com/api';

const Main = ({ auth, setAuth, pets }) => {
  const [profile, setProfile] = useState();

  // Fetch profile info
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(BASE_URL + '/user/' + auth.message.email);
        const data = await response.json();
        setProfile(data.success[0]);
        console.log('AUTH STATE: ', auth);
        console.log('FETCHED PROFILE: ', data.success[0]);
        return data;
      } catch (e) {
        return e;
      }
    };
    getUser();
  }, [auth]);

  if (profile && pets.length >= 1) {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <HomeFull profile={profile} />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/search">
            <Navbar />
            <Search pets={pets} profile={profile} setProfile={setProfile} />
          </Route>
          <Route path="/mypets">
            <Navbar />
            <MyPets profile={profile} />
          </Route>
          <Route path="/settings">
            <Navbar />
            <Profile setAuth={setAuth} profile={profile} setProfile={setProfile} />
          </Route>
          <Route path="/petpage/:id">
            <Navbar />
            <PetPage pets={pets} profile={profile} />
          </Route>
          <Route path="/*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    );
  } else {
    return (
      <div>
        <h1>LOADING!!!!!</h1>
      </div>
    );
  }
};

export default Main;
