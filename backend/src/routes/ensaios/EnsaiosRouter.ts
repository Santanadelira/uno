import express from 'express'
import { cadastrarEnsaios, listarEnsaiosPorItemDeAnalise, resultadoEnsaio } from '../../controllers/ensaios/EnsaiosController'

export default (router : express.Router) => {
    router.post('/ensaios', cadastrarEnsaios)
    router.get('/ensaios/item-de-analise/:id', listarEnsaiosPorItemDeAnalise)
    router.patch('/ensaios/:id', resultadoEnsaio)
}