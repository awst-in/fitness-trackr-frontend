import React, { useState } from 'react';
import ActivitiesCard from './ActivitiesCard';

// const styles = {
//   searchContainer: {
//     display: 'flex',
//     justifyContent: 'center',
//     padding: 0,
//     alignItems: 'center',
//   },
//   searchInput: {
//     margin: '0 16px',
//   },
// };
const activitiesMatches = (activity, searchTerm) => {
  const searchTermLower = searchTerm.toLowerCase();
  const { name, description } = activity;

  const toMatch = [name, description];

  for (const field of toMatch) {
    if (field.toLowerCase().includes(searchTermLower)) {
      return true;
    }
  }
};

const Activities = ({ activities }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const activitiesToDisplay = activities.filter((activity) => activitiesMatches(activity, searchTerm));
  //   console.log(activities);
  return (
    <>
      <div className='outer-container'>
        <div className='search-bar-container'>
          <input
            className='search-bar'
            type='text'
            placeholder='search for activities'
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          ></input>
        </div>
        {activitiesToDisplay.length
          ? activitiesToDisplay.map((activity) => <ActivitiesCard key={activity.id} activity={activity} />)
          : ''}
      </div>
    </>
  );
};

export default Activities;
