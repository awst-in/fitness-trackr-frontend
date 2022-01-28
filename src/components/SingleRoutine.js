import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

const SingleRoutine = ({ routines, token, setRoutines, userData }) => {
  const { routineId } = useParams();
  const history = useHistory();

  const routine = routines.find((routine) => routineId === routine.id);
  console.log('SINGLE ROUTINE: ', routine);

  const isUser = userData.username === routine.creatorName;

  return (
    <>
      {routine ? (
        <div>
          <Container>
            <h3>{routine.name}</h3>
            <p>Created by: {routine.creatorName}</p>
          </Container>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default SingleRoutine;
