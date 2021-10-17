import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';

import { useState, useEffect } from 'react';
import API from './API';

let arr = ['Pizza', 'Pasta', 'Mozzarella'];

function App() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [user, setUser] = useState(0); // 0 = user, 1 = officer, 2 = manager

  const login = async credentials => {
    try {
      setLoading(true);
      const officerInfo = await API.login(credentials);
      setLoggedIn(true);

      setName(officerInfo);
      setUser(1); // In the final project it will be settled wether it's a manager or an officer.
      setLoading(false);
    } catch (err) {
      alert(err);
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    await API.logout();

    setLoggedIn(true);
    setName('');
    setUser(0);
    setLoading(false);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        let officerInfo = await API.getOfficerInfo();
        setLoggedIn(true);
        setName(officerInfo);
        setUser(1);
        setLoading(false);
      } catch (err) {
        console.log(err.error);
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  return loading ? (
    <div className="vh-100 d-flex align-items-center">
      <div className="w-100 d-flex justify-content-center align-items-center pb-4">
        <div
          className="spinner-grow text-primary"
          style={{ width: '3rem', height: '3rem' }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  ) : (
    <Dashboard
      user={user}
      name={name}
      loggedIn={loggedIn}
      loading={loading}
      login={login}
      logout={logout}
    />
  );
}

export default App;
