import express from "express";
import {
  cadastrarSolicitante,
  editarSolicitante,
  listarSolicitantes,
  procurarSolicitante,
} from "../../controllers/solicitantes/SolicitantesController";

export default (router: express.Router) => {
  router.post("/solicitantes", cadastrarSolicitante);
  router.get("/solicitantes", listarSolicitantes);
  router.get("/solicitantes/:cnpj", procurarSolicitante);
  router.patch("/solicitantes/:cnpj", editarSolicitante);
};
