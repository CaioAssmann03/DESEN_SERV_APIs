const retiradaService = require('../service/Retirada_service');
const retiradaRepository = require('../repository/Retirada_repository');

function registrarRetirada(req, res) {
    try {
        const { clienteID, livroID } = req.body;
        const retirada = retiradaService.registrarRetirada(clienteID, livroID);
        res.status(201).json(retirada);
    } catch (error) {
        // Trate erros de negócio com status apropriados
        if (
            error.message === 'Livro não disponível para retirada' ||
            error.message === 'Cliente já possui 3 retiradas ativas' ||
            error.message === 'ClienteID e LivroID são obrigatórios para registrar uma retirada'
        ) {
            res.status(409).json({ error: error.message }); // 409: conflito
        } else {
            res.status(500).json({ error: error.message });
        }
    }
}

function devolverLivro(req, res) {
    try {
        const { retiradaID } = req.body;
        const retirada = retiradaService.devolverLivro(retiradaID);
        res.status(200).json(retirada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

function listar(req, res) {
    try {
        const retiradas = retiradaService.listar();
        res.json(retiradas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    registrarRetirada,
    devolverLivro,
    listar
};

