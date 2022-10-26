import { useAuthContext } from "./useAuthContext"
import { useBookContext } from "./useBookContext"



export const useLogout = () => {
    const {dispatch} = useAuthContext()
    const {dispatch: bookDispatch} = useBookContext()
    
    const logout = () => {

        // logout user by removing data form local storage
        localStorage.removeItem('user')

        //  dispatch logout action
        dispatch({type: 'LOGOUT'})
        bookDispatch({type: 'SET_BOOKS', payload: null})

    }

    return {logout}
}