const Produto_repository = require('./repository/Produto_repository')


function main() {
    Produto_repository.inserir({nome:"Arroz", categoria:"Alimento", preco:4.7});
    Produto_repository.inserir({nome:"Suco de Laranja", categoria:"Bebida", preco:7.5});
    Produto_repository.inserir({nome:"Feijao", categoria:"Alimento", preco:6.7});
    Produto_repository.inserir({nome:"Coca-cola", categoria:"Bebida", preco:8.9});
    Produto_repository.inserir({nome:"Detergente", categoria:"Limpeza", preco:2.5});

    console.log(listar());

    console.log("Produto [id=2]: ", Produto_repository.buscarPorId(2));

    console.log("Produtos da categoria Alimento", Produto_repository.pesquisarPorCategoria("Alimento"));

    console.log("Produtos que possuem a letra 'a'", Produto_repository.pesquisarPorNomeLike("a"));

    Produto_repository.atualizar(4, {nome:"Coca-cola", categoria:"Bebida", preco: 8.5, id:4})

    Produto_repository.deletar(4);

    console.log(listar());

}
 
main();