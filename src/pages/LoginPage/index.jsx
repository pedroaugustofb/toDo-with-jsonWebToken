import React, { useContext, useState } from 'react'
import "./style.css"
import { AuthContext } from '../../services/auth'
import { createUser } from '../../services/api'

const LoginPage = () => {

  const { login } = useContext( AuthContext );
  const [ email, setEmail] = useState('');
  const [ password, setPassword] = useState('');
  const [ register, setRegister] = useState(false);

  const handleLogin = () =>{
    if(register){
      try{
        createUser(email, password);
      } catch(err){
      console.error(err)
      return(
        <div>Algo deu errado</div>
      )
      }
      return(
        <div>
          <h3>Usuario Criado Com Sucesso, Por favor fazer Login.</h3>
        </div>
      )
    }
    else if (!register){
      login(email, password);
    }
  }

  const ChangeRegister =() =>{
    if (register){
      setRegister(false)
    }
    else if(!register){
      setRegister(true)
    }
  }

  return (
    <div id="login">
      <h1 className="title">{!register ? "Login" : "Registro"}</h1>
      <div className="form">

        <div className="field">
          <label htmlFor="email">Email:</label>
          <input 
          type="email" 
          name='email' 
          id='email'
          value={email}
          onChange={ (e)=> setEmail(e.target.value) }
          />
        </div>

        <div className="field">
          <label htmlFor="password">Senha:</label>
          <input 
          type="password" 
          name='password' 
          id='password'
          value={password}
          onChange={ (e)=> setPassword(e.target.value) }
          />
        </div>

        <div className="actions">
          <button onClick={ (e) => ChangeRegister()}>{!register ? "Não Possui Login?" : "Já Possui Login?"}</button>
          <button onClick={handleLogin}>Entrar</button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage