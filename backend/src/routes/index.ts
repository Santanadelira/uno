import express from 'express'
import SolicitantesRouter from './solicitantes/SolicitantesRouter'
import SolicitacoesDeAnaliseRouter from './solicitacoesDeAnalise/SolicitacoesDeAnaliseRouter'
import ItensDeAnaliseRouter from './itensDeAnalise/ItensDeAnaliseRouter'

const router = express.Router()

export default () : express.Router => {
    SolicitantesRouter(router)
    SolicitacoesDeAnaliseRouter(router)
    ItensDeAnaliseRouter(router)
    return router
}