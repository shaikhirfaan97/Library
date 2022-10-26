import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()
    

    const signup = async (userName, email, password, studentID, contactNum, department, year  ) => {
        setError(null);
        setIsLoading(true);

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({userName, email, password, studentID, contactNum, department, year  })
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setIsLoading(false)
        }
        if(response.ok){
            // if response is ok save user's webtokens in the locals storage
            localStorage.setItem('user', JSON.stringify(json))

            // then update the auth context
            dispatch({type:'LOGIN', payload: json})
            setIsLoading(false)

        }
    }

    return {signup, isLoading, error}

}