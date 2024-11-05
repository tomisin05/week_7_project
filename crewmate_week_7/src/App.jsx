import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { supabase } from './client.js'
import './App.css'

import CrewmateForm from '../src/components/CrewmateForm.jsx' 
import CrewmateList from '../src/components/CrewmateList.jsx'
import CrewmateDetails from '../src/components/CrewmateDetails.jsx'
import UpdateCrewmate from '../src/components/UpdateCrewmate.jsx'

function App() {
  const [crewmates, setCrewmates] = useState([])

  useEffect(() => {
    fetchCrewmates()
  }, [])

  async function fetchCrewmates() {
    const { data, error } = await supabase
      .from('crewmates')
      .select('*')
    
    if (error) console.log('Error fetching crewmates:', error)
    else setCrewmates(data)
  }

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/create">Create Crewmate</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={
            <>
              <h1>Crewmate Gallery</h1>
              <CrewmateList crewmates={crewmates} setCrewmates={setCrewmates} />
            </>
          } />
          <Route path="/create" element={
            <>
              <h1>Create a New Crewmate</h1>
              <CrewmateForm setCrewmates={setCrewmates} />
            </>
          } />
          <Route path="/crewmate/:id" element={<CrewmateDetails />} />
          <Route path="/update/:id" element={<UpdateCrewmate />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
