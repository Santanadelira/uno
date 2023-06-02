import express from 'express'
import { cadastrarSolicitacaoDeAnalise, conclusaoDoProjeto, envioResultados, informacoesAdicionais, listarSolicitacoesDeAnalise, procurarSolicitacaoDeAnalise } from '../../controllers/solicitacoesDeAnalise/SolicitacoesDeAnaliseController'

export default (router: express.Router) => { 
    router.post('/solicitacoes-de-analise', cadastrarSolicitacaoDeAnalise)
    router.get('/solicitacoes-de-analise', listarSolicitacoesDeAnalise)
    router.get('/solicitacoes-de-analise/:id', procurarSolicitacaoDeAnalise)
    router.patch('/solicitacoes-de-analise/:id/conclusao-projeto', conclusaoDoProjeto)
    router.patch('/solicitacoes-de-analise/:id/envio-resultados', envioResultados)
    router.patch('/solicitacoes-de-analise/:id/informacoes-adicionais', informacoesAdicionais)
}