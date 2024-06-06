import { useEffect, useState } from 'react'

export async function fetchCountries() {
  try {
    const response = await fetch('https://countriesnow.space/api/v0.1/countries')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching countries:', error)
    throw error
  }
}

export function useCountries() {
  const [countries, setCountries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    try {
      const data = fetchCountries().then((data) => {
        // @ts-ignore
        setCountries(data.data)
        setIsLoading(false)
      })
    } catch (error) {
      setError(true)
      setIsLoading(false)
      console.error('Error fetching countries:', error)
    }
  }, [])

  return [countries, isLoading, error]
}
