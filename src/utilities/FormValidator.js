export function validateForm(formData, setErrors) {
  const newErrors = {}
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
  const aadharRegex = /^\d{12}$/
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/ // At least 8 characters, one uppercase, one lowercase, and one number

  if (!formData.firstName) newErrors.firstName = 'First name is required'
  if (!formData.lastName) newErrors.lastName = 'Last name is required'
  if (!formData.username) newErrors.username = 'Username is required'
  if (!formData.email) {
    newErrors.email = 'Email is required'
  } else if (!emailRegex.test(formData.email)) {
    newErrors.email = 'Invalid email address'
  }
  if (!formData.password) {
    newErrors.password = 'Password is required'
  } else if (!passwordRegex.test(formData.password)) {
    newErrors.password =
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number'
  }
  if (!formData.countryCode) newErrors.countryCode = 'Country code is required'
  if (!formData.phoneNo) newErrors.phoneNo = 'Phone number is required'
  if (!formData.country) newErrors.country = 'Country is required'
  if (!formData.city) newErrors.city = 'City is required'
  if (!formData.panNo) {
    newErrors.panNo = 'PAN number is required'
  } else if (!panRegex.test(formData.panNo)) {
    newErrors.panNo = 'Invalid PAN number'
  }
  if (!formData.aadharNo) {
    newErrors.aadharNo = 'Aadhar number is required'
  } else if (!aadharRegex.test(formData.aadharNo)) {
    newErrors.aadharNo = 'Invalid Aadhar number'
  }

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}
