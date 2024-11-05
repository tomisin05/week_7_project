import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';

const CrewmateDetails = () => {
  const [crewmate, setCrewmate] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchCrewmate();
  }, [id]);

  async function fetchCrewmate() {
    const { data, error } = await supabase
      .from('crewmates')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching crewmate:', error);
    } else {
      setCrewmate(data);
    }
  }

  if (!crewmate) return <div>Loading...</div>;

  return (
    <div>
      <h2>{crewmate.name}</h2>
      <p>Speed: {crewmate.speed}</p>
      <p>Color: {crewmate.color}</p>
      <Link to={`/update/${crewmate.id}`}>Update</Link>
      <Link to="/">Back to List</Link>
    </div>
  );
};

export default CrewmateDetails;