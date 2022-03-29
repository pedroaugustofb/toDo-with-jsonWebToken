import React, { useState } from 'react'

const Search = (props) => {
    const [input, setInput] = useState('');

    const handleClear = () => {
        setInput('');
    }

  return (
    <div className="search">
        <input 
            placeholder='Estudar para prova de matemática...'
            type="text" 
            name='query' 
            id='query'
            value={input}
            onChange={(e)=> setInput(e.target.value)}
        />
        <button onClick={handleClear}>Limpar</button>
        <button onClick={() => props.handleSearch(input)}>Procurar</button>
        <button onClick={() => props.handleCreate(input)}>Adicionar</button>
    </div>
)
}

export default Search