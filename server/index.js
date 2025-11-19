// server/index.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// 1. Conexão com Banco de Dados
const db = new sqlite3.Database('./banco.db', (err) => {
    if (err) console.error(err.message);
    else console.log('Conectado ao SQLite.');
});

// 2. Cria a tabela se não existir
db.run(`CREATE TABLE IF NOT EXISTS tarefas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    texto TEXT
)`);

// 3. Rotas da API (O React vai chamar isso aqui)

// Rota para LISTAR tarefas
app.get('/tarefas', (req, res) => {
    db.all("SELECT * FROM tarefas", [], (err, rows) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json(rows);
    });
});

// Rota para ADICIONAR tarefa
app.post('/tarefas', (req, res) => {
    const { texto } = req.body;
    db.run("INSERT INTO tarefas (texto) VALUES (?)", [texto], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ id: this.lastID, texto });
    });
});

// Inicia o servidor na porta 3001
app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});