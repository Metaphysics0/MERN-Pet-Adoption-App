import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from '../Home/SignUp';
import MyPets from '../MyPets/MyPets';
import Search from '../Search/Search';
import Profile from '../Profile/Profile';
import NavbarAdmin from '../Navbar/NavbarAdmin';
import PetPage from '../PetPage/PetPage';
import Admin from '../Admin/Admin';
import AddPet from '../Admin/AddPet';
import { HomeFull } from '../Home/HomeFull';
import NoMatch from './404/404';
import EditPet from '../EditPet/EditPet';
const BASE_URL = 'http://localhost:5000/api';

const AdminRoutes = ({ auth, setAuth, pets, setPets }) => {
  const [profile, setProfile] = useState();

  // Fetch profile info
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`${BASE_URL}/user/${auth.message.email}`);
        const data = await response.json();
        setProfile(data.success[0]);
        return data;
      } catch (e) {
        return e;
      }
    };
    getUser();
  }, [auth.message.email]);

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
          <NavbarAdmin />
          <Search pets={pets} profile={profile} setProfile={setProfile} />
        </Route>
        <Route path="/mypets">
          <NavbarAdmin />
          <MyPets profile={profile} pets={pets} />
        </Route>
        <Route path="/settings">
          <NavbarAdmin />
          <Profile auth={auth} setAuth={setAuth} profile={profile} setProfile={setProfile} />
        </Route>
        <Route path="/petpage/:id">
          <NavbarAdmin />
          <PetPage pets={pets} profile={profile} />
        </Route>
        <Route path="/admin">
          <NavbarAdmin />
          <Admin pets={pets} setPets={setPets} />
        </Route>
        <Route path="/add-pet">
          <AddPet pets={pets} setPets={setPets} />
        </Route>
        <Route path="/editpet/:id">
          <EditPet pets={pets} />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
};

export default AdminRoutes;
