import React from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';

const CrewmateList = ({ crewmates, setCrewmates }) => {
  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('crewmates')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting crewmate:', error);
    } else {
      setCrewmates(crewmates.filter(crewmate => crewmate.id !== id));
    }
  };

  return (
    <div>
      {crewmates.map(crewmate => (
        <div key={crewmate.id}>
          <h3>{crewmate.name}</h3>
          <p>Speed: {crewmate.speed}</p>
          <p>Color: {crewmate.color}</p>
          <Link to={`/crewmate/${crewmate.id}`}>View Details</Link>
          <Link to={`/update/${crewmate.id}`}>Update</Link>
          <button onClick={() => handleDelete(crewmate.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default CrewmateList;