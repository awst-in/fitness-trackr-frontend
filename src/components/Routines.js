import React, { useState } from 'react';

const styles = {
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: 0,
    alignItems: 'center',
  },
  searchInput: {
    margin: '0 16px',
  },
};

const routineMatches = (routine, searchTerm) => {
  const searchTermLower = searchTerm.toLowerCase();
  const { name, goal, creatorName } = routine;

  const toMatch = [name, goal, creatorName];

  for (const field of toMatch) {
    if (field.toLowerCase().includes(searchTermLower)) {
      return true;
    }
  }
};

const Routines = ({ routines }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const routinesToDisplay = routines.filter((routine) => routineMatches(routine, searchTerm));
  return (
    <>
      <div style={styles.searchContainer}>
        <h2>Routines</h2>
        <input
          style={styles.searchInput}
          type='text'
          placeholder='search for routines'
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        ></input>
      </div>
      {routinesToDisplay.length
        ? routinesToDisplay.map(({ id, name, goal, creatorName }) => (
            <div key={id}>
              {name} createdBy: {creatorName}
            </div>
          ))
        : ''}
    </>
  );
};

export default Routines;
