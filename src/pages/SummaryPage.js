import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client';
import './SummaryPage.css';

const SummaryPage = () => {
    const [crewmates, setCrewmates] = useState([]);
    const [stats, setStats] = useState({});

    useEffect(() => {
        fetchCrewmates();
    }, []);

    const fetchCrewmates = async () => {
        const { data } = await supabase
            .from('Crewmates')
            .select()
            .order('created_at', { ascending: false });
        
        setCrewmates(data);
        calculateStats(data);
    };

    const calculateStats = (data) => {
        const totalCrewmates = data.length;
        const averageSpeed = data.reduce((sum, crewmate) => sum + crewmate.speed, 0) / totalCrewmates;
        const colorCounts = data.reduce((counts, crewmate) => {
            counts[crewmate.color] = (counts[crewmate.color] || 0) + 1;
            return counts;
        }, {});

        setStats({
            totalCrewmates,
            averageSpeed: averageSpeed.toFixed(2),
            mostCommonColor: Object.entries(colorCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0]
        });
    };

    return (
        <div className="SummaryPage">
            <h1>Crew Summary</h1>
            <div className="stats">
                <h2>Summary Statistics</h2>
                <p>Total Crewmates: {stats.totalCrewmates}</p>
                <p>Average Speed: {stats.averageSpeed}</p>
                <p>Most Common Color: {stats.mostCommonColor}</p>
            </div>
            <h2>All Crewmates</h2>
            <div className="crewmate-list">
                {crewmates.map((crewmate) => (
                    <Card key={crewmate.id} id={crewmate.id} name={crewmate.name} speed={crewmate.speed} color={crewmate.color} />
                ))}
            </div>
        </div>
    );
};

export default SummaryPage;