import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../../components/navbar/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  selectItensDeAnalise,
  setItensDeAnalise,
} from "../../../features/itensDeAnalise/itensDeAnaliseSlice";
import Tabela from "../../../components/tabela/Tabela";

interface ItemDeAnaliseState {
  id: string;
  quantidadeRecebida: number;
  quantidadeDisponivel: number;
  unidade: string;
  tipoMaterial: string;
  lote: string;
  notaFiscal: string;
  condicao: string;
  observacao: string;
}

const ConsultarItensDeAnalise = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const itensDeAnalise = useSelector(selectItensDeAnalise);
  const dados: any = [];

  const acao = () => {
    console.log("teste");
  }

  itensDeAnalise &&
    itensDeAnalise.map((itemDeAnalise: ItemDeAnaliseState) =>
      dados.push({
        id: itemDeAnalise.id,
        itemRota: itemDeAnalise.id,
        nome: itemDeAnalise.tipoMaterial,
        info1: itemDeAnalise.lote,
        info2: itemDeAnalise.notaFiscal,
      })
    );

  const getItensDeAnalise = async () => {
    const response = await axios.get(
      "https://uno-production.up.railway.app/itens-de-analise"
    );
    dispatch(setItensDeAnalise({ itensDeAnalise: response.data }));
    setLoading(false);
  };

  useEffect(() => {
    getItensDeAnalise();
  }, []);

  return loading ? (
    <div></div>
  ) : (
    <div>
      <Navbar />

      <div className="w-5/6 mx-auto">
        <Tabela 
        acao={acao}
            dados={dados}
            titulo="Itens de Análise"
            colunas={["Id", "Tipo de Material", "Lote", "Nota Fiscal"]}
            consultarRota="/itens-de-analise"
            textoPesquisa="Digite o tipo de material"
            editar={false}
            cadastrar={false}
            textoBotao=""
        />
      </div>
    </div>
  );
};

export default ConsultarItensDeAnalise;
