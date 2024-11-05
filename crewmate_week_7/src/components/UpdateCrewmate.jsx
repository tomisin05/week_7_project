import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const UpdateCrewmate = () => {
  const [name, setName] = useState('');
  const [speed, setSpeed] = useState(1);
  const [color, setColor] = useState('red');
  const { id } = useParams();
  const navigate = useNavigate();

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
      setName(data.name);
      setSpeed(data.speed);
      setColor(data.color);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('crewmates')
      .update({ name, speed, color })
      .eq('id', id);

    if (error) {
      console.error('Error updating crewmate:', error);
    } else {
      navigate(`/crewmate/${id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Crewmate Name"
        required
      />
      <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))}>
        <option value={1}>Slow</option>
        <option value={2}>Normal</option>
        <option value={3}>Fast</option>
      </select>
      <select value={color} onChange={(e) => setColor(e.target.value)}>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="yellow">Yellow</option>
      </select>
      <button type="submit">Update Crewmate</button>
    </form>
  );
};

export default UpdateCrewmate;