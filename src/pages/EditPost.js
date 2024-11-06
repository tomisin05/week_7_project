import React from 'react';
import { useParams } from 'react-router-dom';
import './EditPost.css'
import { useState } from 'react';
import { supabase } from '../client';

const EditCrewmate = ({data}) => {

    const updateCrewmate = async (event) => {
        event.preventDefault();
      
        await supabase
          .from('Crewmates')
          .update({name: crewmate.name, speed: crewmate.speed, color: crewmate.color})
          .eq('id', id)
      
        window.location = "/";
      }

    
    const deleteCrewmate = async (event) => {
        event.preventDefault();

        await supabase
          .from('Crewmates')
          .delete()
          .eq('id', id)

        window.location = "http://localhost:3000/";
      }

    const {id} = useParams();
    const [crewmate, setCrewmate] = useState({id: null, name: "", speed: 0, color: ""});

    const handleChange = (event) => {
        const {name, value} = event.target;
        setCrewmate( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    return (
        <div>
            <form>
                <label htmlFor="name">Name</label> <br />
                <input type="text" id="name" name="name" value={crewmate.name} onChange={handleChange}/><br />
                <br/>

                <label htmlFor="speed">Speed (mph, max 20)</label><br />
                <input 
                    type="number" 
                    id="speed" 
                    name="speed" 
                    value={crewmate.speed} 
                    onChange={handleChange}
                    min="0"
                    max="20"
                    step="0.1"
                />
                <br/>
                <br/>

                <label htmlFor="color">Color</label><br />
                <select id="color" name="color" value={crewmate.color} onChange={handleChange}>
                    <option value="">Select Color</option>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="yellow">Yellow</option>
                </select>
                <br/>
                <br/>
                <input type="submit" value="Update Crewmate" onClick={updateCrewmate} />
                <button className="deleteButton" onClick={deleteCrewmate}>Delete</button>
            </form>
        </div>
    )
}

export default EditCrewmate