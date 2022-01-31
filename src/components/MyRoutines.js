import React, { useState } from 'react';
import { API_URL, callApi } from '../api';

const MyRoutines = ({ routines, userData }) => {
  const [myRoutines, setMyRoutines] = useState([]);
  const API_URL = '/users/me';
  const getRoutines = async (event) => {
    event.preventDefault();
    try {
      const data = await callApi({
        url: API_URL,
        token,
      });
      // console.log(data);
      setMyRoutines(myRoutines);
    } catch (error) {
      console.error(error);
    }
  };
  // console.log('ROUTINES: ', routines);
  return (
    <>
      <h2>{userData.username} 's Routines</h2>
      {myRoutines.map((routine) => {
        <div key={routine.id}>
          <p>{routine.name}</p>
        </div>;
      })}
    </>
  );
};

export default MyRoutines;
