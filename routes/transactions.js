const express = require('express');// Importa o framework Express

const router = express.Router(); //Criar um roteador
const transactionsController = require('../controllers/transactionsController'); //importar o controlador

router.get('/',transactionsController.getAlltramsactions);

module.express = router;