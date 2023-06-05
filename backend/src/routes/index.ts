import express from 'express'
import SolicitantesRouter from './solicitantes/SolicitantesRouter'
import SolicitacoesDeAnaliseRouter from './solicitacoesDeAnalise/SolicitacoesDeAnaliseRouter'
import ItensDeAnaliseRouter from './itensDeAnalise/ItensDeAnaliseRouter'
import UsuariosRouter from './usuarios/UsuariosRouter'
import EnsaiosRouter from './ensaios/EnsaiosRouter'
import DashboardRouter from './dashboard/DashboardRouter'

const router = express.Router()

export default () : express.Router => {
    SolicitantesRouter(router)
    SolicitacoesDeAnaliseRouter(router)
    ItensDeAnaliseRouter(router)
    UsuariosRouter(router)
    EnsaiosRouter(router)
    DashboardRouter(router)
    return router
}