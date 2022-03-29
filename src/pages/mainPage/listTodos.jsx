import React from 'react'

const ListTodos = (props) => {

  return (
    <div className="todos">
        <h2 className="titles">To Do's</h2>

        <ul className="list">
            {
                props.todos.map((e) => (
                    <li className="item" key={e._id}>
                        <div className="info">
                            <div className="name">
                                {e.name}
                            </div>
                        </div>
                        <button className='myButton' onClick={() => props.handleDelete(e)}>Apagar</button>
                    </li>
                ))

            }
        </ul>
    </div>
  )
}

export default ListTodos