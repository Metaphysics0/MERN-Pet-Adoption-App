import './Sass/base.scss';
import { useEffect, useState } from 'react';
import Main from './Components/Routes/Main';
import Register from './Components/Routes/Register';
import AdminRoutes from './Components/Routes/AdminRoutes';
const BASE_URL = 'http://localhost:5000/api';

function App() {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('login')) || '');
  const [pets, setPets] = useState([]);

  // Fetch pets list
  useEffect(() => {
    const getPets = async () => {
      try {
        const response = await fetch(`${BASE_URL}/pets`);
        const data = await response.json();
        setPets(data);
        return data;
      } catch (e) {
        return e;
      }
    };
    getPets();
  }, []);

  if (auth && auth.message.admin) {
    return <AdminRoutes pets={pets} setPets={setPets} auth={auth} setAuth={setAuth} />;
  } else if (auth) {
    return <Main pets={pets} auth={auth} setAuth={setAuth} />;
  } else {
    return <Register pets={pets} setAuth={setAuth} />;
  }
}

export default App;
