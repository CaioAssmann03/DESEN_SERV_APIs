const usuarioRepository = require('../repository/usuario_repository');
const tokenService = require('./token_service');

function listar() {
    return usuarioRepository.listar();
}

function inserir(usuario) {
    if(usuario && usuario.email && usuario.senha){
        return usuarioRepository.inserir(usuario);
    }
    else {
        throw { id: 400, msg: "Usuario sem dados corretos"}
    }
}

function buscarPorId(id) {
    let usuario = usuarioRepository.buscarPorId(id);
    if(usuario) {
        return usuario;
    }
    else {
        throw { id: 404, msg: "Usuario não encontrado!" }
    }
}

function buscarPorEmail(email) {
    let usuario = usuarioRepository.buscarPorEmail(email);
    if(usuario) {
        return usuario;
    }
    else {
        throw { id: 404, msg: "Usuario não encontrado!" }
    }
}

function verificarLogin(user) {
    if(user.email) {
        let usuarioCadastrado = usuarioRepository.buscarPorEmail(user.email);
        if(usuarioCadastrado) {
            if(user.senha && user.senha == usuarioCadastrado.senha)
            {
                const token = tokenService.criarToken({ id:usuarioCadastrado.id });
                return { token: token };
            }
        }
    }
    throw { id: 401, msg: "Email ou senha invalidos!" }

}

function deletar(id) {
    let usuario = usuarioRepository.buscarPorId(id);
    if(usuario) {
        usuarioRepository.deletar(id);
    }
    else {
        throw { id: 404, msg: "Usuario não encontrado!" }
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    buscarPorEmail,
    verificarLogin,
    deletar
}