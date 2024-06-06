<<<<<<< HEAD
// Libraries
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// css
import './Form.css' // Import the CSS file

// utilities
import { validateForm } from '../../utilities/FormValidator'

// services
import { useCountries } from '../../service/CountryService'

const Form = () => {
  /** Hook that helps us interact with the backend for country info */
  const [countries, isCountriesLoading, isCountriesLoadingError] = useCountries()

  /** Error state for the form */
  const [errors, setErrors] = useState({})

  /** Cities based on the current country  */
  const [cities, setCities] = useState([])
=======
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
>>>>>>> 7ce4dd9d652b09df48ab5bbb3e59ece1e1f0733d

  /** State for showing/hiding password for the user */
  const [passwordVisible, setIsPasswordVisible] = useState(false)

<<<<<<< HEAD
  const navigate = useNavigate()

  const handleCountryChange = (e) => {
    const countryName = e.target.value
    const country = countries.find((arr) => arr.country == countryName)
    setCities(country?.cities || [])
  }
=======
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
>>>>>>> 7ce4dd9d652b09df48ab5bbb3e59ece1e1f0733d

   // Toggle password visibility
  const togglePasswordVisibility = () => {
<<<<<<< HEAD
    setIsPasswordVisible((prev) => !prev)
  }

  // Handle form submission
  const handleSubmit = (e) => {
    const { target } = e
    const formData = new FormData(target)
    const form = Object.fromEntries(formData.entries())

    e.preventDefault()
    if (validateForm(form, setErrors)) {
      navigate('/success', { state: { formData: form } })
    }
  }

  const renderNameInfo = () => {
    return (
      <>
        <div>
          <input type='text' name='firstName' placeholder='First Name *' required />
          {errors.firstName && <span>{errors.firstName}</span>}
        </div>
        <div>
          <input type='text' name='lastName' placeholder='Last Name *' />
          {errors.lastName && <span>{errors.lastName}</span>}
        </div>
        <div>
          <input type='text' name='username' placeholder='Username *' />
          {errors.username && <span>{errors.username}</span>}
        </div>
      </>
    )
  }

  const renderEmailInfo = () => {
    return (
      <>
        <div>
          <input type='email' name='email' placeholder='Email *' />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <div className='password-container'>
          <input type={passwordVisible ? 'text' : 'password'} name='password' placeholder='Password *' />
          <button type='button' className='password-toggle' onClick={togglePasswordVisibility}>
            {passwordVisible ? 'Hide' : 'Show'}
          </button>
          {errors.password && <span>{errors.password}</span>}
        </div>
      </>
    )
  }

  const renderCountryInfo = () => {
    return (
      <>
        <div>
          <select name='country' disabled={isCountriesLoading} onChange={handleCountryChange}>
            <option value=''>Select Country *</option>
            {countries.map((country) => (
              <option key={country.country} value={country.country}>
                {country.country}
              </option>
            ))}
          </select>
          {isCountriesLoadingError && <span>Error loading countries</span>}
          {errors.country && <span>{errors.country}</span>}
        </div>
        <div>
          <select name='city'>
            <option value=''>Select City *</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && <span>{errors.city}</span>}
        </div>
      </>
    )
  }

  function renderPersonalInfo() {
    return (
      <>
        <div className='phone-container'>
          <div className='phone-field'>
            <input type='text' name='countryCode' placeholder='+91' />
            {errors.countryCode && <span>{errors.countryCode}</span>}
          </div>
          <div className='phone-field'>
            <input type='number' name='phoneNo' placeholder='Phone No *' />
            {errors.phoneNo && <span>{errors.phoneNo}</span>}
          </div>
        </div>
        <div>
          <input type='text' name='panNo' placeholder='PAN No *' />
          {errors.panNo && <span>{errors.panNo}</span>}
        </div>
        <div>
          <input type='text' name='aadharNo' placeholder='Aadhar No *' />
          {errors.aadharNo && <span>{errors.aadharNo}</span>}
        </div>
      </>
    )
  }
  // Render the form
  return (
    <form onSubmit={handleSubmit}>
      {renderNameInfo()}
      {renderEmailInfo()}
      {renderCountryInfo()}
      {renderPersonalInfo()}
      <button type='submit'>Submit</button>
=======
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
>>>>>>> 7ce4dd9d652b09df48ab5bbb3e59ece1e1f0733d
    </form>
  )
}

export default Form
