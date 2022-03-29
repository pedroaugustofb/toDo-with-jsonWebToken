import { createContext, useEffect, useState } from 'react'
import { Api, createSession } from './api';

import { useNavigate } from 'react-router-dom';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) =>{
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if(user && token){
            setUser(JSON.parse(user))
            Api.defaults.headers.Authorization = `Beaer ${token}`
        }

        setLoading(false)
    },[])


    const login = async (email, password) =>{
        const res = await createSession(email,password);
        
        Api.defaults.headers.Authorization = `Beaer ${res.data.token}`

        localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user)

        navigate('/')
    }   


    const logout = () =>{
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null)
        Api.defaults.headers.Authorization = null

        navigate('/login')
    }

    return(
        <AuthContext.Provider 
            value={{
                authenticated: !!user,
                user,
                loading,
                login,
                logout
            }}>
            {children}   
        </AuthContext.Provider>
    )
}