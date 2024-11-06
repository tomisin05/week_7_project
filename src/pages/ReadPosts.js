import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import './ReadPosts.css'
import { supabase } from '../client';

const CrewmateSummary = (props) => {

    const [crewmates, setCrewmates] = useState([]);

    useEffect(() => {

    // READ all crewmates from table
    const fetchCrewmates = async () => {
    const {data} = await supabase
      .from('Crewmates')
      .select()
      .order('created_at', { ascending: false });
  
    // set state of crewmates
    setCrewmates(data)
  }
  fetchCrewmates();
    }, [props]);
    
    return (
        <div className="CrewmateSummary">
            {
                crewmates && crewmates.length > 0 ?
                crewmates.map((crewmate,index) => 
                   <Card key={crewmate.id} id={crewmate.id} name={crewmate.name} speed={crewmate.speed} color={crewmate.color}/>
                ) : <h2>{'No Crewmates Yet 😞'}</h2>
            }
        </div>  
    )
}

export default CrewmateSummary;