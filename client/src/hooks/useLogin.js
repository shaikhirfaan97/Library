import { useState } from 'react'
import { useAuthContext } from './useAuthContext'


export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save user data to the local storage
      localStorage.setItem('user', JSON.stringify(json))

      // updating the auth context through dispatch
      dispatch({type: 'LOGIN', payload: json})
      

      // loading state is updated
      setIsLoading(false)
    }
  }

  return { login, isLoading, error }
}