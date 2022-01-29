import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { callApi } from '../api';
import { AccountForm, Navigation, Routines, Profile, SingleRoutine, MyRoutines, Activities } from './';

const App = () => {
  const [token, setToken] = useState('');
  const [routines, setRoutines] = useState([]);
  const [activities, setActivities] = useState([]);
  const [userData, setUserData] = useState({});

  const fetchUserData = async (token) => {
    const data = await callApi({
      url: '/users/me',
      token,
    });
    console.log('USERDATA: ', data);
    return data;
  };
  const fetchRoutines = async () => {
    const routines = await callApi({ url: '/routines' });
    console.log('ROUTINES: ', routines);
    return routines;
  };
  const fetchActivities = async () => {
    const activities = await callApi({ url: '/activities' });
    console.log('ACTIVITIES: ', activities);
    return activities;
  };

  useEffect(() => {
    const fetchData = async () => {
      const routines = await fetchRoutines();
      setRoutines(routines);
      const activities = await fetchActivities();
      setActivities(activities);
      if (!token) {
        setToken(localStorage.getItem('token'));
        return;
      }
      const data = await fetchUserData(token);
      if (data) {
        setUserData(data);
      }
    };
    fetchData();
  }, [token]);

  return (
    <>
      <Navigation token={token} />
      <Switch>
        <Route exact path='/'>
          FITNESS TRAC.KR HOMEPAGE
        </Route>
        <Route exact path='/profile'>
          <Profile token={token} userData={userData} />
        </Route>
        <Route path='/register'>
          <AccountForm action='register' setToken={setToken} setUserData={setUserData} />
        </Route>
        <Route path='/login'>
          {!token ? (
            <AccountForm action='login' setToken={setToken} setUserData={setUserData} />
          ) : (
            <>
              <div>You are already logged in!</div>
              <br />
            </>
          )}
        </Route>
        <Route exact path='/routines'>
          <Routines routines={routines} activities={activities} />
        </Route>
        <Route exact path='/activities'>
          <Activities activities={activities} />
        </Route>
        <Route path='/routines/:routineId'>
          <SingleRoutine routines={routines} token={token} userData={userData} />
        </Route>
        <Route exact path='/myroutines'>
          <MyRoutines routines={routines} />
        </Route>
      </Switch>
    </>
  );
};

export default App;
