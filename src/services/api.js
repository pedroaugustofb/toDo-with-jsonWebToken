import axios from 'axios';

const isLocalHost = true;

export const Api = axios.create({
    baseURL: isLocalHost ? 'http://localhost:5000' : 'http://localhost:5000'
})

export const createSession = async(email, password) =>{
    return Api.post('/sessions', { email, password })
}

export const getTodos = async(userId, query) => { 
    let url = `/users/${userId}/todos`

    if (query !== ''){
        url += `?q=${query}`
    }

    return Api.get(url);
}

export const createTodos = async(userId, name) => {
    const url = `/users/${userId}/todos`

    return Api.post(url, {
        name: `${name}`
    })
}

export const createUser = async(email, password) =>{
    return Api.post(`/users`,{
        email: `${email}`,
        password:`${password}`
    })
}

export const deleteTodos = async(userId, todoId) => {
    const url = `/users/${userId}/todos/${todoId}`

    return Api.delete(url);
}