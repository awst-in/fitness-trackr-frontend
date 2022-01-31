import React from 'react';

const ActivitiesCard = ({ activity }) => {
  const { id, name, description, count, duration, routineId, routineActivityId } = activity;

  return (
    <div key={id} className='routine-card-container'>
      <div className='details-container'>
        <h2>{name}</h2>
        <p>Description: {description}</p>
      </div>
    </div>
  );
};

export default ActivitiesCard;
