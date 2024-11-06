import React from 'react'
import { useState } from 'react'
import './Card.css'
import more from './more.png'
import { Link } from 'react-router-dom'
import { supabase } from '../client';

const Card = (props) =>  {

  const [count, setCount] = useState(0)
  const updateCount = () => {
    const updatePost = async (event) => {
      event.preventDefault();
    
      await supabase
        .from('Posts')
        .update({ betCount: count + 1})
        .eq('id', props.id)
    
      window.location = "/";
    }
    setCount((count) => count + 1);
  }

  return (
      <div className="Card">
          <Link to={'edit/'+ props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
          <h2 className="name">{props.name}</h2>
          <h3 className="speed">{"Speed: " + props.speed}</h3>
          <p className="color">{"Color: " + props.color}</p>
          <Link to={'/crewmate/'+ props.id}>
            <button className="detailButton">View Details</button>
          </Link>
      </div>
  );
};

export default Card;