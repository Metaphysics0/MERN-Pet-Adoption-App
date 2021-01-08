import React, { useEffect, useState } from 'react';
import Users from './Users';
import { AiOutlineApi } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import PetCardAdmin from '../PetCard/PetCardAdmin';
const BASE_URL = 'http://localhost:5000/api';

const Admin = ({ pets }) => {
  const [users, setUsers] = useState([]);

  // Get list of all users
  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(BASE_URL + '/users');
      const data = await response.json();
      setUsers(data);
    };
    getUsers();
  }, []);

  return (
    <div className="admin">
      <div className="admin-heading">
        <h1 className="admin-heading__heading">Admin Page</h1>
        <h2 className="admin-heading__subheading">Server Side API Access</h2>
      </div>
      <div className="admin-main">
        <h2 className="admin-main__heading">
          Pets API&nbsp;
          <AiOutlineApi />
        </h2>
        <h3 className="admin-main__subheading">Express | GraphQL | MongoDB</h3>
        <div className="admin-main__pets">
          <div className="admin-main__pets--content">
            {pets.map((pet, index) => (
              <PetCardAdmin key={index} index={index} pet={pet} />
            ))}
          </div>
        </div>
        <div className="admin-main--bottom">
          <h3 className="admin-main__subheading mb">Feeling Creative?</h3>
          <h3 className="admin-main__subheading--2">
            Go to the &nbsp;
            <Link className="admin-main__link" to="/add-pet">
              pet creation interface
            </Link>
          </h3>
        </div>
      </div>
      <div className="admin-right">
        <h3 className="admin-right__heading">Users</h3>
        <table className="admin-right__users">
          <tbody>
            {users.map((user, index) => (
              <Users key={index} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
