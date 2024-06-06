<<<<<<< HEAD
import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Form from './components/form-page/Form'
import Success from './components/success-page/Success'
import './App.css'
import Sample from './components/Sample'
=======
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Form from './components/form-page/Form';
import Success from './components/success-page/Success';
>>>>>>> 7ce4dd9d652b09df48ab5bbb3e59ece1e1f0733d

function App() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark-mode', darkMode)
  }

  return (
    <Router>
<<<<<<< HEAD
      <div className='app-container'>
        <button className='mode-toggle' onClick={toggleDarkMode}>
          {darkMode ? 'Dark Mode' : 'Light Mode'}
=======
      <div className="app-container">
        <button className="mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
>>>>>>> 7ce4dd9d652b09df48ab5bbb3e59ece1e1f0733d
        </button>
        <Routes>
          <Route path='/' element={<Form />} />
          <Route path='/success' element={<Success />} />
        </Routes>
        <Sample />
      </div>
    </Router>
  )
}

<<<<<<< HEAD
export default App
=======
export default App;
>>>>>>> 7ce4dd9d652b09df48ab5bbb3e59ece1e1f0733d
