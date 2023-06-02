import express from 'express'
import SolicitantesRouter from './solicitantes/SolicitantesRouter'
import SolicitacoesDeAnaliseRouter from './solicitacoesDeAnalise/SolicitacoesDeAnaliseRouter'
import ItensDeAnaliseRouter from './itensDeAnalise/ItensDeAnaliseRouter'
import UsuariosRouter from './usuarios/UsuariosRouter'

const router = express.Router()

export default () : express.Router => {
    SolicitantesRouter(router)
    SolicitacoesDeAnaliseRouter(router)
    ItensDeAnaliseRouter(router)
    UsuariosRouter(router)
    return router
}