import React, { useState } from 'react';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom';

const CrewmateForm = ({ setCrewmates }) => {
  const [name, setName] = useState('');
  const [speed, setSpeed] = useState(1);
  const [color, setColor] = useState('red');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('crewmates')
      .insert([{ name, speed, color }])
      .select();

    if (error) {
      console.error('Error inserting crewmate:', error);
    } else {
      setCrewmates((prevCrewmates) => [...prevCrewmates, ...data]);
      setName('');
      setSpeed(1);
      setColor('red');
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Crewmate name"
        required
      />
      <input
        type="number"
        value={speed}
        onChange={(e) => setSpeed(Number(e.target.value))}
        min="1"
        max="10"
        required
      />
      <select value={color} onChange={(e) => setColor(e.target.value)}>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="yellow">Yellow</option>
      </select>
      <button type="submit">Create Crewmate</button>
    </form>
  );
};

export default CrewmateForm;