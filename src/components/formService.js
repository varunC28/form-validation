// formService.js

export const fetchCountries = async () => {
    try {
      const response = await fetch('https://countriesnow.space/api/v0.1/countries');
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching countries:", error);
      return [];
    }
  };
  
  export const handleChange = (e, countries, setCities, setErrors) => {
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
  
