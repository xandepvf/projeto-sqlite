// client/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Importando nosso estilo novo

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    carregarTarefas();
  }, []);

  const carregarTarefas = async () => {
    try {
      const resposta = await axios.get('http://localhost:3001/tarefas');
      setTarefas(resposta.data);
    } catch (erro) {
      console.error("Erro ao buscar tarefas", erro);
    }
  };

  const adicionarTarefa = async (e) => {
    // Previne que a página recarregue se der enter no form
    if (e) e.preventDefault(); 
    
    if (!input) return;
    try {
      await axios.post('http://localhost:3001/tarefas', { texto: input });
      setInput('');
      carregarTarefas();
    } catch (erro) {
      console.error("Erro ao salvar", erro);
    }
  };

  return (
    <div className="container">
      <h1>Minhas Tarefas </h1>
      
      {/* Formulário para adicionar */}
      <form className="input-group" onSubmit={adicionarTarefa}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="O que precisa ser feito?"
        />
        <button type="submit">
          Adicionar
        </button>
      </form>

      {/* Lista de Tarefas */}
      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>
            {tarefa.texto}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;