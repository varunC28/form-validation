import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css'; // Import the CSS file
import { validate } from '../validate';

const Form = () => {
     // State variables
  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Fetch countries data on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries');
        const data = await response.json();
        setCountries(data.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

   // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));

    // Handle country change to update cities
    if (name === "country") {
      const selectedCountry = countries.find((country) => country.country === value);
      if (selectedCountry) {
        setCities(selectedCountry.cities);
      } else {
        setCities([]);
      }
    }
  };

   // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      navigate('/success', { state: { formData } });
    }
  };

  // Render input field with error message
  const renderInputField = (name, placeholder, type = 'text') => (
    <div>
      <input type={type} name={name} onChange={handleChange} placeholder={placeholder} />
      {errors[name] && <span>{errors[name]}</span>}
    </div>
  );

  // Render personal information fields
  const renderPersonalInfo = () => (
    <div>
      {renderInputField('firstName', 'First Name *')}
      {renderInputField('lastName', 'Last Name *')}
      {renderInputField('username', 'Username *')}
    </div>
  );

  // Render account information fields
  const renderAccountInfo = () => (
    <div>
      {renderInputField('email', 'Email *', 'email')}
      <div className="password-container">
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          onChange={handleChange}
          placeholder='Password *'
        />
        <button type="button" className="password-toggle" onClick={togglePasswordVisibility}>
          {showPassword ? 'Hide' : 'Show'}
        </button>
        {errors.password && <span>{errors.password}</span>}
      </div>
    </div>
  );

  // Render contact information fields
  const renderContactInfo = () => (
    <div>
      <div className="phone-container">
        <div className="phone-field">
          {renderInputField('countryCode', '91 *')}
        </div>
        <div className="phone-field">
          {renderInputField('phoneNo', 'Phone No *')}
        </div>
      </div>
      <div>
        <select name="country" onChange={handleChange}>
          <option value="">Select Country *</option>
          {countries.map((country) => (
            <option key={country.country} value={country.country}>{country.country}</option>
          ))}
        </select>
        {errors.country && <span>{errors.country}</span>}
      </div>
      <div>
        <select name="city" onChange={handleChange}>
          <option value="">Select City *</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>{city}</option>
          ))}
        </select>
        {errors.city && <span>{errors.city}</span>}
      </div>
      {renderInputField('panNo', 'PAN No *')}
      {renderInputField('aadharNo', 'Aadhar No *')}
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      {renderPersonalInfo()}
      {renderAccountInfo()}
      {renderContactInfo()}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
