import express from "express";
import { cadastrarItensDeAnalise, listarItensDeAnalisePorSolicitacao } from "../../controllers/itensDeAnalise/ItensDeAnaliseController";
import { listarEnsaiosPorItemDeAnalise } from "../../controllers/ensaios/EnsaiosController";

export default (router : express.Router) => {
    router.post('/itens-de-analise', cadastrarItensDeAnalise)
    router.get('/itens-de-analise', listarEnsaiosPorItemDeAnalise)
    router.get('/itens-de-analise/solicitacao/:id', listarItensDeAnalisePorSolicitacao)
}