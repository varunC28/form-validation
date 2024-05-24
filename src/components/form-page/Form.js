import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css'; // Import the CSS file

const Form = () => {
  // State variables to manage form data, errors, countries, cities, and password visibility
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    showPassword: false,
    countryCode: '',
    phoneNo: '',
    country: '',
    city: '',
    panNo: '',
    aadharNo: ''
  });

  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  // Fetch countries from API when the component mounts
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

  // Update cities when the selected country changes
  useEffect(() => {
    if (formData.country) {
      const selectedCountry = countries.find(country => country.country === formData.country);
      if (selectedCountry) {
        setCities(selectedCountry.cities);
      } else {
        setCities([]);
      }
    }
  }, [formData.country, countries]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  // Validate form data
  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const aadharRegex = /^\d{12}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // At least 8 characters, one uppercase, one lowercase, and one number

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number';
    }
    if (!formData.countryCode) newErrors.countryCode = 'Country code is required';
    if (!formData.phoneNo) newErrors.phoneNo = 'Phone number is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.panNo) {
      newErrors.panNo = 'PAN number is required';
    } else if (!panRegex.test(formData.panNo)) {
      newErrors.panNo = 'Invalid PAN number';
    }
    if (!formData.aadharNo) {
      newErrors.aadharNo = 'Aadhar number is required';
    } else if (!aadharRegex.test(formData.aadharNo)) {
      newErrors.aadharNo = 'Invalid Aadhar number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate('/success', { state: { formData } });
    }
  };

  // Render the form
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder='First Name *' />
        {errors.firstName && <span>{errors.firstName}</span>}
      </div>
      <div>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder='Last Name *' />
        {errors.lastName && <span>{errors.lastName}</span>}
      </div>
      <div>
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder='Username *' />
        {errors.username && <span>{errors.username}</span>}
      </div>
      <div>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Email *' />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div className="password-container">
        <input
          type={formData.showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder='Password *'
        />
        <button type="button" className="password-toggle" onClick={togglePasswordVisibility}>
          {formData.showPassword ? 'Hide' : 'Show'}
        </button>
        {errors.password && <span>{errors.password}</span>}
      </div>
      <div className="phone-container">
        <div className="phone-field">
          <input type="text" name="countryCode" value={formData.countryCode} onChange={handleChange} placeholder='+91' />
          {errors.countryCode && <span>{errors.countryCode}</span>}
        </div>
        <div className="phone-field">
          <input type="text" name="phoneNo" value={formData.phoneNo} onChange={handleChange} placeholder='Phone No *' />
          {errors.phoneNo && <span>{errors.phoneNo}</span>}
        </div>
      </div>
      <div>
        <select name="country" value={formData.country} onChange={handleChange}>
          <option value="">Select Country *</option>
          {countries.map((country) => (
            <option key={country.country} value={country.country}>{country.country}</option>
          ))}
        </select>
        {errors.country && <span>{errors.country}</span>}
      </div>
      <div>
        <select name="city" value={formData.city} onChange={handleChange}>
          <option value="">Select City *</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>{city}</option>
          ))}
        </select>
        {errors.city && <span>{errors.city}</span>}
      </div>
      <div>
        <input type="text" name="panNo" value={formData.panNo} onChange={handleChange} placeholder='PAN No *' />
        {errors.panNo && <span>{errors.panNo}</span>}
      </div>
      <div>
        <input type="text" name="aadharNo" value={formData.aadharNo} onChange={handleChange} placeholder='Aadhar No *' />
        {errors.aadharNo && <span>{errors.aadharNo}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
