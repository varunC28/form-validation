import React from 'react'
import { useLocation } from 'react-router-dom'
import './Success.css'

const Success = () => {
  const location = useLocation()
  const { state } = location
  const formData = state ? state.formData : null

  if (!formData) {
    return <div>No form data found.</div>
  }

  const { firstName, lastName, username, email, phoneNo, country, city, panNo, aadharNo } = formData

  return (
    <div className='success-container'>
      <h1>Form Submitted Successfully</h1>
      <ul>
        <li>
          <b>First Name :</b> {firstName}
        </li>
        <li>
          <b>Last Name :</b> {lastName}
        </li>
        <li>
          <b>Username :</b> {username}
        </li>
        <li>
          <b>Email :</b> {email}
        </li>
        <li>
          <b>Phone No :</b> {phoneNo}
        </li>
        <li>
          <b>Country :</b> {country}
        </li>
        <li>
          <b>City :</b> {city}
        </li>
        <li>
          <b>PAN No :</b> {panNo}
        </li>
        <li>
          <b>Aadhar No :</b> {aadharNo}
        </li>
      </ul>
    </div>
  )
}

<<<<<<< HEAD
export default Success
=======
export default Success;
>>>>>>> 7ce4dd9d652b09df48ab5bbb3e59ece1e1f0733d
