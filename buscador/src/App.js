import { useState } from 'react';

import { FiSearch } from 'react-icons/fi';
import './style.css';
import api from './services/api';

function App() {
  const [search, setSearch] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {
    //cep/json
    if(search === '') {
      setCep({});
      alert('Preencha o campo de busca com algum CEP!');
      return;
    }

    try {
      const res = await api.get(`${search}/json`);
      setCep(res.data);
      if(res.data.erro === true) {
        alert('CEP não encontrado, digite um CEP válido!');	
      }
      setSearch('');
    }
    catch (error) {
      alert('Erro ao buscar CEP.');
      setSearch('');
      setCep({});
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>
      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu CEP..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        
        <button className="btnSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>

      {Object.keys(cep).length > 1 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}, {cep.bairro}, {cep.localidade} - {cep.uf}</span>
        </main>
      )}
    </div>
  );
}

export default App;
