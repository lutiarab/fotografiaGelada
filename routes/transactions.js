const express = require('express');// Importa o framework Express

const router = express.Router(); //Criar um roteador
const transactionsController = require('../controllers/transactionsController'); //importar o controlador

router.get('/',transactionsController.getAlltramsactions);

router.post('/',transactionsController.addTransaction);

router.put('/:id', transactionsController.updateTrasactionPut);

router.patch('/:id', transactionsController.updateTrasactionPatch);

router.delete('/:id', transactionsController.deleteTransactions);

module.exports = router;