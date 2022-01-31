import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Dropdown } from 'react-bootstrap';

const RoutinesCard = ({ routine }) => {
  // console.log('ROUTINE CARD: ', routine);
  const { name, goal, id, creatorName, activities } = routine;
  const history = useHistory();
  return (
    <div key={id} className='routine-card-container'>
      <div className='details-container'>
        <h2>{name}</h2>
        <p>Goal: {goal}</p>
        <div>
          Activities:
          {activities
            ? activities.map(({ id, name }) => {
                return (
                  <div key={id}>
                    <p>{name}</p>
                  </div>
                );
              })
            : ''}
        </div>
        <p>Created by: {creatorName}</p>
        <Button variant='secondary' onClick={() => history.push(`/routines/${routine.id}`)}>
          View Routine
        </Button>
      </div>
    </div>
  );
};

export default RoutinesCard;
