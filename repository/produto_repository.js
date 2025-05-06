let produtos = [];
let idAtual = 1;

function listar() {
    return produtos;
}

function inserir(produto) {
    produto.id = idAtual++;
    produtos.push(produto);
    return produto;
}

function buscarPorId(id) {
    return produtos.find(p => p.id === id);
}

function atualizar(id, produtoAtualizado) {
    const index = produtos.findIndex(p => p.id === id);
    if (index !== -1) {
        produtos[index] = { id, ...produtoAtualizado };
        return produtos[index];
    }
    return null;
}

function deletar(id) {
    const index = produtos.findIndex(p => p.id === id);
    if (index !== -1) {
        const produtoRemovido = produtos.splice(index, 1);
        return produtoRemovido[0];
    }
    return null;
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
};
