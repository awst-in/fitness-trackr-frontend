import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { callApi } from '../api';

const DeleteRoutine = ({ token }) => {
  const history = useHistory();
  const { routineId } = useParams();

  const API_URL = `/routines/${routineId}`;
  const handleClick = async () => {
    try {
      await callApi({
        url: API_URL,
        method: 'DELETE',
        token,
      });
      history.push('/routines');
      //need to reset posts dynamically
      window.location.reload(false);
    } catch (error) {
      console.error('Error deleting a routine:', error);
    }
  };
  return (
    <>
      <Button variant='secondary' onClick={handleClick}>
        Delete Routine
      </Button>
    </>
  );
};

export default DeleteRoutine;
