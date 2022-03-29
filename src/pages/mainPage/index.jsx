import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../services/auth'

import ListTodos from './listTodos'
import Nav from './nav'
import Search from './search'
import { 
    getTodos, 
    createTodos, 
    deleteTodos,
} from '../../services/api'
import "./style.css"

const MainPage = () => {

    const { user, logout } = useContext(AuthContext)   
    const [ data, setData]  = useState([]);
    const [ loading, setLoading]  = useState(true);
    const [ loadingError, setLoadingError ] = useState(false)

    
    const loadData = async (query = '') =>{
        try{
            setLoading(true)
            const res = await getTodos(user?.id, query) 
            setData(res.data)
            setLoading(false)
        }catch(err){
            console.error(err)
            setLoadingError(true)
        }
    }
    useEffect(() => {

        (async () => await loadData() )();
    }, [])

    const handleLogout= () =>{
        logout();
    }

    const handleSearch = (query) => {
            loadData(query);
    }
    const handleDelete = async( todo) => {
        await deleteTodos(user?.id, todo._id);
        await loadData();
    }
    const handleCreate = async ( name) =>{
        try{
            await createTodos(user?.id, name);
            await loadData();
        }catch(err){
            console.error(err)
            setLoadingError(true)
        }
        
    }

    if(loadingError){
        return(
            <div className="loading">
                Erro ao carregar to do's. <Link to="/login">Voltar</Link>
            </div>
        )
    }

    if(loading){
        return(
        <div className="loading">
            Carregando...
        </div>
        )
    }   

    return (
        <div id="main">
            <Nav 
                handleLogout={handleLogout}
            />

            <Search 
                handleCreate={handleCreate}
                handleSearch={handleSearch}
            />

            <ListTodos 
                todos={data}
                handleDelete={handleDelete}
            />

        </div>
    )
}

export default MainPage;