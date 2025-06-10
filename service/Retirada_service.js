const retiradaRepository = require('../repository/Retirada_repository');
const livroRepository = require('../repository/Livro_repository');


function registrarRetirada(clienteID, livroID) {
    // Validação dos IDs
    if (!clienteID || !livroID) {
        throw new Error('ClienteID e LivroID são obrigatórios para registrar uma retirada');
    }

    // veerifica se ciente ja tem 3 retiradas ativas
    const retiradasAtivas = retiradaRepository.listarPorCliente(clienteID);
    if (retiradasAtivas.length >= 3) {
        throw new Error('Cliente já possui 3 retiradas ativas');
    }

    // Verifica se o livro está disponível
    const livro = livroRepository.buscarPorId(livroID);
    if (!livro || !livro.disponivel) {
        throw new Error('Livro não disponível para retirada');
    }


    // Define a data devolução como 7 dias após a retirada
    const dataRetirada = new Date();
    const dataDevolucao = new Date();
    dataDevolucao.setDate(dataRetirada.getDate() + 7);

    // Registra a retirada
    const retirada = retiradaRepository.registrarRetirada({
        clienteID,
        livroID,
        dataRetirada,
        dataDevolucao
    });

    // Marca o livro como indisponível
    livroRepository.marcarLivroIndisponivel(livroID);

    return retirada;
}

function devolverLivro(RetiradaId){
    const dataDevolucao = new Date();
    const retirada = retiradaRepository.devolverLivro(RetiradaId, dataDevolucao);


    if (!retirada) {
        throw new Error('Retirada não encontrada ou já devolvida');
    }

    // Marca o livro como disponível
    livroRepository.marcarLivroDisponivel(retirada.livroID);

    return retirada;
}

function listar() {
    return retiradaRepository.listarRetiradas();
}

module.exports = {
    registrarRetirada,
    devolverLivro,
    listar
};


