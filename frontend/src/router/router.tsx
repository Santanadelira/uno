import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/auth/login/Login";
import PrivateRoute from "../components/privateRoutes/PrivateRoute";
import Dashboard from "../pages/dashboard/Dashboard";
import CadastrarSolicitacaoDeAnalise from "../pages/solicitacoesDeAnalise/cadastrar/CadastrarSolicitacaoDeAnalise";
import CadastrarItensDeAnalise from "../pages/itensDeAnalise/cadastrar/CadastrarItensDeAnalise";
import CadastrarSolicitante from "../pages/solicitantes/cadastrar/CadastrarSolicitante";
import ConsultarSolicitantes from "../pages/solicitantes/consultar/ConsultarSolicitantes";
import DetalhesSolicitante from "../pages/solicitantes/detalhes/DetalhesSolicitante";
import ConsultarSolicitacaoDeAnalise from "../pages/solicitacoesDeAnalise/consultar/ConsultarSolicitacaoDeAnalise";
import DetalhesSolicitacoesDeAnalise from "../pages/solicitacoesDeAnalise/detalhes/DetalhesSolicitacoesDeAnalise";
import EditarSolicitante from "../pages/solicitantes/editar/EditarSolicitante";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
        element: <PrivateRoute />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "/solicitantes/cadastrar",
            element: <CadastrarSolicitante />
          },
          {
            path: "/solicitantes/consultar",
            element: <ConsultarSolicitantes />
          },
          {
            path: "/solicitantes/:cnpj",
            element: <DetalhesSolicitante />
          },
          {
            path: '/solicitantes/:cnpj/editar',
            element: <EditarSolicitante />
          },
          {
            path: "/solicitacoes-de-analise/cadastrar",
            element: <CadastrarSolicitacaoDeAnalise />,
          },
          {
            path: "/solicitacoes-de-analise/consultar",
            element: <ConsultarSolicitacaoDeAnalise />
          },
          {
            path: "/solicitacoes-de-analise/:id",
            element: <DetalhesSolicitacoesDeAnalise />
          },
          {
            path: "/itens-de-analise/cadastrar",
            element: <CadastrarItensDeAnalise />,
          }
        ],
      },
    ],
  },
]);
