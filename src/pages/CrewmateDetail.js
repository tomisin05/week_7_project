import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import './CrewmateDetail.css';

const CrewmateDetail = () => {
    const { id } = useParams();
    const [crewmate, setCrewmate] = useState(null);

    useEffect(() => {
        const fetchCrewmate = async () => {
            const { data, error } = await supabase
                .from('Crewmates')
                .select('*')
                .eq('id', id)
                .single();

            if (error) console.log('Error: ', error);
            else setCrewmate(data);
        };

        fetchCrewmate();
    }, [id]);

    if (!crewmate) return <div>Loading...</div>;

    return (
        <div className="CrewmateDetail">
            <h2>{crewmate.name}</h2>
            <p>ID: {crewmate.id}</p>
            <p>Time Created: {crewmate.created_at}</p>
            <p>Speed: {crewmate.speed}</p>
            <p>Color: {crewmate.color}</p>
        </div>
    );
};

export default CrewmateDetail;