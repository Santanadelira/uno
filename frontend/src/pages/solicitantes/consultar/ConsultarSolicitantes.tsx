import Navbar from "../../../components/navbar/Navbar.tsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSolicitantes,
  setSolicitantes,
} from "../../../features/solicitantes/solicitantesSlice.ts";
import axios from "axios";
import Tabela from "../../../components/tabela/Tabela.tsx";

interface SolicitanteState {
  cnpj: string;
  nome: string;
  cep: string;
  endereco: string;
  numero: string;
  cidade: string;
  estado: string;
  responsavel: string;
  email: string;
  telefone: string;
}

const ConsultarSolicitantes = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const solicitantes = useSelector(selectSolicitantes);
  const dados: any = [];

  const acao = () => {
    console.log("teste");
  }

  solicitantes &&
    solicitantes.map((solicitante: SolicitanteState) =>
      dados.push({
        id: solicitante.cnpj.slice(0, 2) +
        "." +
        solicitante.cnpj.slice(2, 5) +
        "." +
        solicitante.cnpj.slice(5, 8) +
        "/" +
        solicitante.cnpj.slice(8, 12) +
        "-" +
        solicitante.cnpj.slice(12, 14),
        itemRota:
          solicitante.cnpj,
        nome: solicitante.nome,
        info1: solicitante.responsavel,
        info2: solicitante.email,
      })
    );

  const getSolicitantes = async () => {
    const response = await axios.get(
      "https://uno-production.up.railway.app/solicitantes"
    );
    dispatch(setSolicitantes({ solicitantes: response.data }));
    setLoading(false);
  };

  useEffect(() => {
    getSolicitantes();
  }, []);

  return loading ? (
    <div></div>
  ) : (
    <div className="min-h-screen">
      <Navbar />

      <div className="w-5/6 mx-auto">
        <Tabela
        acao={acao}
          titulo="Solicitantes"
          textoPesquisa="Digite o nome do solicitante"
          consultarRota="/solicitantes"
          colunas={["CNPJ", "Nome", "Responsável", "Email"]}
          dados={dados}
          editar={true}
          cadastrar={false}
          textoBotao=""
        />
      </div>
    </div>
  );
};

export default ConsultarSolicitantes;
