import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import { DeleteRoutine } from './';

const SingleRoutine = ({ routines, token, setRoutines, userData }) => {
  const history = useHistory();
  let { routineId } = useParams();
  routineId = parseInt(routineId);

  const routine = routines.find((obj) => {
    return routineId === obj.id;
  });
  console.log('ROUTINE: ', routine);
  // console.log(routine.creatorName);
  const isUser = userData.username === routine.creatorName;

  return (
    <>
      {routine ? (
        <div>
          <Container>
            <h1>{routine.name}</h1>
            <h4>Goal: {routine.goal}</h4>
            <p>Created by: {routine.creatorName}</p>
            {isUser ? (
              <>
                <Button variant='secondary' onClick={() => history.push(`${routineId}/edit`)}>
                  Edit
                </Button>{' '}
                <DeleteRoutine token={token} routineId={routineId} setRoutines={setRoutines} />
              </>
            ) : (
              ''
            )}
          </Container>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default SingleRoutine;
