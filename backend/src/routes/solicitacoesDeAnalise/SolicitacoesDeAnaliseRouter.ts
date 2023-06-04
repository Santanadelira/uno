import express from 'express'
import { atualizarSolicitacaoDeAnalise, cadastrarSolicitacaoDeAnalise, listarSolicitacoesDeAnalise, procurarSolicitacaoDeAnalise } from '../../controllers/solicitacoesDeAnalise/SolicitacoesDeAnaliseController'

export default (router: express.Router) => { 
    router.post('/solicitacoes-de-analise', cadastrarSolicitacaoDeAnalise)
    router.get('/solicitacoes-de-analise', listarSolicitacoesDeAnalise)
    router.get('/solicitacoes-de-analise/:id', procurarSolicitacaoDeAnalise)
    router.patch('/solitacoes-de-analise/:id', atualizarSolicitacaoDeAnalise)
}