import express from 'express'
import { cadastrarUsuario, excluirUsuarios, listarUsuarios, logar, procurarUsuario } from '../../controllers/usuarios/UsuariosController'

export default (router : express.Router) => {
    router.post('/auth/cadastrar', cadastrarUsuario)
    router.post('/auth/login', logar)
    router.get('/usuarios', listarUsuarios)
    router.get('/usuarios/:email', procurarUsuario)
    router.delete('/usuarios/:email', excluirUsuarios)
}