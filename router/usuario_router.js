const express = require('express')
const router = express.Router();

const usuarioController = require('../controller/usuario_controller')

//endpoint: /usuarios
router.get('/', usuarioController.listar)
router.post('/', usuarioController.inserir)
router.get('/:id', usuarioController.buscarPorId)
router.delete('/:id', usuarioController.deletar)

module.exports = router;
