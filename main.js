let listaProdutos = [];
let autoIncrement = 1;

function listar() {
    return listaProdutos;
}

function buscarPorId(id) {
    /*for(let produto of listaProdutos){
        if(produto.id == id) {
            return produto;
        }
    }*/
    return (listaProdutos.find(
        function(produto) {
            return (produto.id == id);        
        }
    ));
}

function inserir(produto) {
    produto.id = autoIncrement++;
    listaProdutos.push(produto);
}

function buscarIndicePorId(id) {
    return listaProdutos.findIndex((produto) => produto.id === id);
}

function atualizar(id, produtoAtual) {
    let indice = buscarIndicePorId(id);
    if(indice >= 0) {
        produtoAtual.id = id; 
        listaProdutos[indice] = produtoAtual;
    }
}

function deletar(id) {
    let indiceProduto = buscarIndicePorId(id);
    if(indiceProduto >= 0) {
        listaProdutos.splice(indiceProduto, 1);
    }
}

function pesquisarPorCategoria(categoria) {
    return listaProdutos.filter( (produto) => produto.categoria == categoria )
}

function pesquisarPorNomeLike(nome) {
    return listaProdutos.filter ( (produto) => {
        const produtoNomeUpper = produto.nome.toUpperCase();
        const nomeUpper = nome.toUpperCase();
        return (produtoNomeUpper.search(nomeUpper) >= 0);
    })
}



function main() {
    inserir({nome:"Arroz", categoria:"Alimento", preco:4.7});
    inserir({nome:"Suco de Laranja", categoria:"Bebida", preco:7.5});
    inserir({nome:"Feijao", categoria:"Alimento", preco:6.7});
    inserir({nome:"Coca-cola", categoria:"Bebida", preco:8.9});
    inserir({nome:"Detergente", categoria:"Limpeza", preco:2.5});

    console.log(listar());

    console.log("Produto [id=2]: ", buscarPorId(2));

    console.log("Produtos da categoria Alimento", pesquisarPorCategoria("Alimento"));

    console.log("Produtos que possuem a letra 'a'", pesquisarPorNomeLike("a"));

    atualizar(4, {nome:"Coca-cola", categoria:"Bebida", preco: 8.5, id:4})

    deletar(4);

    console.log(listar());

}
 
main();