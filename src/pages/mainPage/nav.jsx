import React from 'react'

const Nav = (props) => {
  return (
    <div className="nav">
        <h1 className='logo'>To Do's</h1>
        <button onClick={props.handleLogout}>Sair</button>
    </div>
  )
}

export default Nav