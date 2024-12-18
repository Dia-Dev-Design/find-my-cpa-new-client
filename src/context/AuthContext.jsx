import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { get } from '../services/backend'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    const navigate = useNavigate()

    const getToken = () => {
        let token = localStorage.getItem('userToken')
        return token
    }
    
    const removeToken = () => {
        localStorage.clear()
    }

    const logOut = () => {
        removeToken()
        setUser(null)
        navigate('/')
    }

    const authentication = async () => {

        try {

            let token = getToken()

            if (token){

                let user = await get('/users/verify')
                console.log("This is our user data:", user)
                setUser(user)

            } else {
                navigate('/login')
            }


        } catch(err) {
            logOut()
            console.log(err)
        }

    }




    useEffect(() => {
        authentication()
    },[])

    return  <AuthContext.Provider value={{ user, logOut }}>
                {children}
            </AuthContext.Provider>
}

export { AuthContext, AuthProvider }