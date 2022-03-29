import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { AuthContext, AuthProvider } from './services/auth'

import LoginPage from './pages/LoginPage'
import MainPage from './pages/mainPage'

const AppRoutes = () => {

  const Private = ({ children }) =>{
    const navigate = useNavigate();
    const { authenticated, loading } = useContext(AuthContext)

    if(loading){
      return <div className='loading'>Carregando...</div>
    }


    if( !authenticated ){
      console.log('/login')
      return navigate('/login')
    }
    
    return children;
  }

  return (
    <Router>
      <AuthProvider>
        <Routes>
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/" element={<Private>
                                            <MainPage />  
                                          </Private>} />
        </Routes>
      </AuthProvider>
    </Router>
)
}

export default AppRoutes