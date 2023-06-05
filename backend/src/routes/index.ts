import express from 'express'
import SolicitantesRouter from './solicitantes/SolicitantesRouter'
import SolicitacoesDeAnaliseRouter from './solicitacoesDeAnalise/SolicitacoesDeAnaliseRouter'
import ItensDeAnaliseRouter from './itensDeAnalise/ItensDeAnaliseRouter'
import UsuariosRouter from './usuarios/UsuariosRouter'
import EnsaiosRouter from './ensaios/EnsaiosRouter'

const router = express.Router()

export default () : express.Router => {
    SolicitantesRouter(router)
    SolicitacoesDeAnaliseRouter(router)
    ItensDeAnaliseRouter(router)
    UsuariosRouter(router)
    EnsaiosRouter(router)
    return router
}