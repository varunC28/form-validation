import React from 'react';
import { useLocation } from 'react-router-dom';
import './Success.css';

const Success = () => {
  const location = useLocation();
  const { state } = location;
  const formData = state ? state.formData : null;

  if (!formData) {
    return <div>No form data found.</div>;
  }

  return (
    <div className="success-container">
      <h1>Form Submitted Successfully</h1>
      <ul>
        <li><b>First Name :</b> {formData.firstName}</li>
        <li><b>Last Name :</b> {formData.lastName}</li>
        <li><b>Username :</b> {formData.username}</li>
        <li><b>Email :</b> {formData.email}</li>
        <li><b>Phone No :</b> {formData.phoneNo}</li>
        <li><b>Country :</b> {formData.country}</li>
        <li><b>City :</b> {formData.city}</li>
        <li><b>PAN No :</b> {formData.panNo}</li>
        <li><b>Aadhar No :</b> {formData.aadharNo}</li>
      </ul>
    </div>
  );
};

export default Success;