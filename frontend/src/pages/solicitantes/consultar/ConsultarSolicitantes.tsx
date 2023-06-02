import {
  EyeIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Navbar from "../../../components/navbar/Navbar.tsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSolicitantes,
  setSolicitantes,
} from "../../../features/solicitantes/solicitantesSlice.ts";
import axios from "axios";
import ItemLista from "../../../components/itemLista/ItemLista.tsx";
import Paginacao from "../../../components/paginacao/Paginacao.tsx";


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
  const [solicitantesFiltrados, setSolicitantesFiltrados] = useState(solicitantes);
  const [nomeProcura, setNomeProcura] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const solicitantesPorPagina = 5;
  const lastSolicitanteIndex = paginaAtual * solicitantesPorPagina
  const firstSolicitanteIndex = lastSolicitanteIndex - solicitantesPorPagina
  
  const dadosPaginaAtual = solicitantesFiltrados && solicitantesFiltrados
    .slice(firstSolicitanteIndex, lastSolicitanteIndex)
    .map((solicitante: SolicitanteState) => (
      <ItemLista
        id={`${solicitante.cnpj}`}
        titulo={`${solicitante.nome}`}
        descricao={`${solicitante.cidade}, ${solicitante.estado}`}
        rota="solicitantes"
        DescricaoIcon={<MapPinIcon  className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
        aria-hidden="true"/>}
        BotaoIcon={
          <EyeIcon
            className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        }
        acao="Consultar"
      />
    ));

  const getSolicitantes = async () => {
    const response = await axios.get("https://uno-production.up.railway.app/solicitantes");
    dispatch(setSolicitantes({solicitantes: response.data}));
    setLoading(false);
  };

  const changeNomeProcura = (e: React.FormEvent<HTMLInputElement>) => {
    setNomeProcura(e.currentTarget.value);
  };

  useEffect(() => {
    getSolicitantes();
  });

  useEffect(() => {
    setSolicitantesFiltrados(
      solicitantes.filter((solicitante: SolicitanteState) =>
        solicitante.nome
          .toLocaleLowerCase()
          .includes(nomeProcura.toLocaleLowerCase())
      )
    );
    setPaginaAtual(1)
  }, [nomeProcura]);

  return ( loading ? (<div></div>) :
    <div className="min-h-screen">
      <Navbar />

      <div className="w-5/6 mx-auto">
        <h2 className="font-semibold leading-7 text-gray-900 font-inter mt-7 border-b border-b-gray-900/10 pb-7">
          Consultar Solicitantes
        </h2>

        <div className="relative mt-7">
          <input
            type="text"
            onChange={changeNomeProcura}
            className="focus:ring-indigo-600 text-sm py-2 px-3 rounded-md shadow-sm font-inter ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-inset focus:outline-none w-full"
            placeholder="Digite o nome do solicitante"
          />
          <MagnifyingGlassIcon className="h-6 w-6 absolute right-2 text-gray-800 top-1.5" />
        </div>
        {dadosPaginaAtual}
        <Paginacao totalItens={solicitantesFiltrados && solicitantesFiltrados.length} itensPorPagina={solicitantesPorPagina} setPaginaAtual={setPaginaAtual} paginaAtual={paginaAtual}/>
      </div>
    </div>
  );
};

export default ConsultarSolicitantes;
