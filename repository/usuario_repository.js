let listaUsuarios = [
    { id:1, email: "admin@mail.com", senha: "123456" }
];
let autoIncrement = 2;

function listar() {
    return listaUsuarios;
}

function buscarPorId(id) {
    return (listaUsuarios.find(
        function(usuario) {
            return (usuario.id == id);        
        }
    ));
}

function buscarPorEmail(email) {
    return (listaUsuarios.find(
        function(usuario) {
            return (usuario.email == email);        
        }
    ));
}


function inserir(usuario) {
    if(!usuario || !usuario.email || !usuario.senha) {
        return;
    }

    usuario.id = autoIncrement++;
    listaUsuarios.push(usuario);
    return usuario;
}

function deletar(id) {
    const index = listaUsuarios.findIndex(usuario => usuario.id === id);
    if (index !== -1) {
        listaUsuarios.splice(index, 1);
        return true; // Deletado com sucesso
    }
    return false; // Não encontrado
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    buscarPorEmail,
    deletar
}