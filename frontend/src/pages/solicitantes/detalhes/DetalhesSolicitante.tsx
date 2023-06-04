import { useSelector } from "react-redux";
import Navbar from "../../../components/navbar/Navbar.tsx";
import { useParams } from "react-router-dom";
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

const keyMap: Record<string, string> = {
  Desenvolvimento: "Desenvolvimento",
  Degradacao_Forcada: "Degradação Forçada",
  Validacao: "Validação",
  Controle: "Controle",
  Solubilidade: "Solubilidade",
  Estabilidade: "Estabilidade",
  Perfil_de_Dissolucao: "Perfil de Dissolução",
  Solventes_Residuais: "Solventes Residuais",
  Sumario_de_Validacao: "Sumário de Validação",
};

const DetalhesSolicitante = () => {
  const { cnpj } = useParams();
  const solicitante = useSelector((state: any) =>
    state.solicitantes.solicitantes.filter(
      (solicitante: SolicitanteState) => solicitante.cnpj === cnpj
    )
  );

  const dados: any = [];

  solicitante[0].solicitacoesDeAnalise && solicitante[0].solicitacoesDeAnalise.map((solicitacao: any) => {
    dados.push({
      id: solicitacao.id,
      itemRota: solicitacao.id,
      nome: solicitacao.nomeProjeto,
      info1: new Date(solicitacao.aberturaSA).toLocaleDateString(
        "pt-BR",
        {
          timeZone: "America/Sao_Paulo",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }
      ),
      info2: keyMap[solicitacao.tipoDeAnalise],
    });
  })

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="w-5/6 mx-auto mt-7">
        <div className="border-b border-b-gray-900/10 pb-7">
          <h2 className="text-gray-900 font-semibold leading-7 font-inter">
            Informações do solicitante
          </h2>
          <p className="font-inter mt-1 text-sm leading-6 text-gray-600">
            Informações do solicitante e suas solicitações de análise
          </p>
        </div>
        <div>
          <dl className="divide-y divide-gray-900/10">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                CNPJ
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {solicitante[0].cnpj.slice(0, 2) +
                  "." +
                  solicitante[0].cnpj.slice(2, 5) +
                  "." +
                  solicitante[0].cnpj.slice(5, 8) +
                  "/" +
                  solicitante[0].cnpj.slice(8, 12) +
                  "-" +
                  solicitante[0].cnpj.slice(12, 14)}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Nome fantasia
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {solicitante[0].nome}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                CEP
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {solicitante[0].cep.slice(0, 5) +
                  "-" +
                  solicitante[0].cep.slice(5)}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Endereço
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {solicitante[0].endereco} {solicitante[0].numero},{" "}
                {solicitante[0].cidade} - {solicitante[0].estado}
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Responsável
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {solicitante[0].responsavel}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Telefone do responsável
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {"(" +
                  solicitante[0].telefone.slice(0, 2) +
                  ") " +
                  solicitante[0].telefone.slice(2, 3) +
                  " " +
                  solicitante[0].telefone.slice(3, 7) +
                  "-" +
                  solicitante[0].telefone.slice(7)}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Email do responsável
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {solicitante[0].email}
              </dd>
            </div>
          </dl>
        </div>

        <Tabela 
          dados={dados}
          colunas={[
            "Id",
            "Nome do projeto",
            "Abertura",
            "Tipo de análise"]}
          titulo="Solicitações de análise"
          consultarRota="/solicitacoes-de-analise"
          textoPesquisa="Pesquisar solicitações de análise do solicitante"
          key={solicitante[0].cnpj}
        />
      </div>
    </div>
  );
};

export default DetalhesSolicitante;
