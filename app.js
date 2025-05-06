// app.js

const express = require('express');
const produtoService = require('./service/produto_service');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/produtos', (req, res) => {
    res.json(produtoService.listar());
});

app.post('/produtos', (req, res) => {
    try {
        const produto = produtoService.inserir(req.body);
        res.status(201).json(produto);
    } catch (err) {
        res.status(err.id || 500).json(err);
    }
});

app.get('/produtos/:id', (req, res) => {
    try {
        const produto = produtoService.buscarPorId(+req.params.id);
        res.json(produto);
    } catch (err) {
        res.status(err.id || 500).json(err);
    }
});

app.put('/produtos/:id', (req, res) => {
    try {
        const produto = produtoService.atualizar(+req.params.id, req.body);
        res.json(produto);
    } catch (err) {
        res.status(err.id || 500).json(err);
    }
});

app.delete('/produtos/:id', (req, res) => {
    try {
        produtoService.deletar(+req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(err.id || 500).json(err);
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
