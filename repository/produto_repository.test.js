const produtoRepository = require("./produto_repository.js");

//Cenário de sucesso
test('Quando inserir o produto arroz, deve retornar e conter na lista o produto com id=1'
    , () => {
        //produto que se espera ser cadastrado (com id)
        const produtoInseridoEsperado = {
            id: 1,
            nome: "Arroz",
            categoria: "alimento",
            preco: 4.00
        };
        //Inserindo o produto no repositorio
        const produtoInserido = produtoRepository.inserir({
            nome: "Arroz",
            categoria: "alimento",
            preco: 4.00
        });
        //Verificando se o produto inserido que retornou está correto
        expect(produtoInserido).toEqual(produtoInseridoEsperado);
        //Verificando se o produto foi inserido no repositório
        expect(produtoRepository.listar()).toContainEqual(produtoInseridoEsperado);
    })
//Cenário de exceção
test('Quando inserir o produto sem categoria, não deve retornar e não insere na lista'
    , () => {
        //Criado o cenário (com id=2 porque conta o teste anterior) para o produto inserido sem categoria
        const produtoInseridoErrado = {
            id: 2,
            nome: "Massa",
            preco: 4.00
        };
        //Inserindo o produto sem categoria
        const produtoInserido = produtoRepository.inserir({
            nome: "Massa",
            preco: 4.00
        });
        //O produto não deve retornar
        expect(produtoInserido).toEqual(undefined);
        //Não deve inserir na lista o produto errado
        expect(produtoRepository.listar()).not.toContainEqual(produtoInseridoErrado);
    })

//Cenário de sucesso - buscarPorId()
test('Quando buscar por um id existente, deve retornar o dado corretamente', () => {
    //Vou inserir um segundo produto para o teste (id=2)
    const produtoInserido = produtoRepository.inserir({
        nome: "Feijao",
        categoria: "alimento",
        preco: 7.00
    });
    const resultado = produtoRepository.buscarPorId(produtoInserido.id);
    //Podemos fazer testes mais simples:
    expect(resultado).toBeDefined();
    expect(resultado.nome).toBe("Feijao")
});
//Cenário de exceção - buscarPorId()
test('Quando buscar por id inexistente, deve retornar undefined', () => {
    const resultado = produtoRepository.buscarPorId(10);
    expect(resultado).toBeUndefined();
});

//Cenário de sucesso - deletar()
test('Quando deletar um id existente, deve remover e retornar o dado', () => {
    const produtoDeletadoEsperado = {
        nome: "Feijao",
        categoria: "alimento",
        preco: 7.00,
        id: 2
    };
    const quantidadeEsperada = 1;
    resultado = produtoRepository.deletar(2);
    expect(resultado).toEqual(produtoDeletadoEsperado);
    expect(produtoRepository.listar().length).toBe(quantidadeEsperada);

})
//Cenário de exceção - deletar()
test('Quando deletar um produto com id inexistente, deve retornar undefined', () => {
    const resultado = produtoRepository.deletar(10);
    expect(resultado).toBeUndefined();
});

//Cenário de sucesso - atualizar
test('Quando atualizar um produto existente, deve atualizar na lista e retornar produto atualizado', () => {
    //Vou inserir um terceiro produto para o teste (id=3)
    const produtoInserido = produtoRepository.inserir({
        nome: "Suco de Laranja",
        categoria: "bebida",
        preco: 10.00
    });
    const produtoAtualizadoEsperado = {
        nome: "Suco de Laranja",
        categoria: "bebida",
        preco: 10.50,
        id: 3
    };
    resultado = produtoRepository.atualizar(3, {         
        nome: "Suco de Laranja",
        categoria: "bebida",
        preco: 10.50,
    });
    expect(resultado).toEqual(produtoAtualizadoEsperado);
    //Verificando se o produto foi atualizado no repositório
    expect(produtoRepository.listar()).toContainEqual(produtoAtualizadoEsperado);
})

//Cenário de exceção 1 - atualizar
test('Quando atualizar um produto com id inexistente, deve retornar undefined', () => {
    const resultado = produtoRepository.atualizar(8, {
        nome: "Suco de Uva",
        categoria: "bebida",
        preco: 12.50,
    });
    expect(resultado).toBeUndefined();
});

//Cenário de exceção 2 - atualizar
test('Quando atualizar o produto sem categoria, não deve retornar e não atualiza na lista'
    , () => {
        //Criado o cenário (Errado, porque não deve atualizar - sem categoria)
        const produtoAtualizadoErrado = {
            id: 3,
            nome: "Suco de Laranja",
            preco: 11.00
        };
        //Atualizar o produto sem categoria
        const produtoAtualizado = produtoRepository.atualizar(3, {
            nome: "Suco de Laranja",
            preco: 11.00
        });
        //O produto não deve retornar
        expect(produtoAtualizado).toEqual(undefined);
        //Não deve inserir na lista o produto errado
        expect(produtoRepository.listar()).not.toContainEqual(produtoAtualizadoErrado);
    })

//Cenário de sucesso - pesquisarPorCategoria 
test('Quando buscar pela categoria alimento, deve retornar pelo menos um produto (arroz)', () => {
    const resultado = produtoRepository.pesquisarPorCategoria("alimento");
    //Podemos testar com o Length > 0:
    expect(resultado.length).toBeGreaterThan(0);
    //Conter o arroz no retorno do indice 0 - esperado porque é o primeiro produto
    expect(resultado[0].nome).toBe("Arroz");
});


//Cenário de sucesso - pesquisarPorNomeLike
test('Quando buscar pelo nome "suco, deve retornar pelo menos um produto (Suco de Laranja)', () => {
    const resultado = produtoRepository.pesquisarPorNomeLike("suco");
    //Podemos testar com o Length > 0:
    expect(resultado.length).toBeGreaterThan(0);
    //Conter o arroz no retorno do indice 0 - esperado porque é o primeiro produto
    expect(resultado[0].nome).toBe("Suco de Laranja");
});
