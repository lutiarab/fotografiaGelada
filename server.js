const bodyParser = require('body-parser');// Importa o pacote body-parser para analisar o corpo das requisições HTTP
const express = require('express');// Importa o framework Express
const cors = require('cors');// Importa o pacote cors para permitir requisições de diferentes origens

const dotenv = require('dotenv');// Importa o pacote dotenv para gerenciar variáveis de ambiente

dotenv.config();// Carrega as variáveis definidas no arquivo '.env' para process.env(processos)

const db = require('./config/db');
const transactionsRoutes = require('./routes/transactions');

const app = express();// Inicializa uma nova aplicação Express

app.use(cors());// Habilita o CORS para todas as rotas
app.use(bodyParser.json());// Configura o body-parser para analisar requisições JSON

app.use('/api/transactions', transactionsRoutes);

app.get('/', (req, res) =>{
    res.send(`Servidor rodando na porta ${PORT}`);
});

const PORT = process.env.DB_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});