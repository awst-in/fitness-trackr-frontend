import React, { useState } from 'react';
import { callApi } from '../api';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

const RoutineForm = ({ token, setRoutines, routines, action }) => {
  const { routineId } = useParams();
  const history = useHistory();

  const [newRoutine, setNewRoutine] = useState({
    name: '',
    description: '',
    goal: '',
    creatorName: '',
    isPublic: true,
  });
  const isEdit = action === 'edit';
  const title = isEdit ? 'Edit this routine' : 'Add a new routine';
  const method = isEdit ? 'PATCH' : 'POST';
  const API_URL = isEdit ? `/routines/${routineId}` : `/routines`;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // console.log('submitted')
      const routine = await callApi({
        url: API_URL,
        method: method,
        body: {
          name: newRoutine.name,
          description: newRoutine.description,
          goal: newRoutine.goal,
          creatorName: newRoutine.creatorName,
          isPublic: newRoutine.isPublic,
        },
        token,
      });
      if (isEdit) {
        const filteredRoutines = routines.filter((routine) => routine.id !== routineId);
        setRoutines([...filteredRoutines, routine]);
      } else {
        setRoutines([...routines, routine]);
      }
      history.push('/routines');
      window.location.reload(false);
    } catch (error) {
      console.error('error adding a routine: ', error);
    }
  };
  const routineFieldChange = (property) => (event) => {
    if (property === 'isPublic') {
      setNewRoutine({ ...newRoutine, [property]: event.target.checked });
    } else {
      setNewRoutine({ ...newRoutine, [property]: event.target.value });
    }
  };
  return (
    <Container>
      <div>
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Name of Routine'
            value={newRoutine.name}
            onChange={routineFieldChange('name')}
          ></input>
          <br />
          <input
            type='text'
            placeholder='Goal'
            value={newRoutine.goal}
            onChange={routineFieldChange('goal')}
          ></input>
          <br />
          {token ? (
            <Button variant='secondary' type='submit'>
              {title}
            </Button>
          ) : (
            ''
          )}
        </form>
      </div>
    </Container>
  );
};

export default RoutineForm;
