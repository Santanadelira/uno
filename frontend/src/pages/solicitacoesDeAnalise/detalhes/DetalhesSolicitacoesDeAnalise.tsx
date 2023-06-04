import { useSelector } from "react-redux";
import Navbar from "../../../components/navbar/Navbar.tsx";
import { useParams } from "react-router-dom";

interface SolicitacoesState {
  id: string;
  nomeProjeto: string;
  aberturaSA: Date;
  inicioDoProjeto: Date | null;
  entradaDosMateriais: Date | null;
  conclusaoDoProjeto: Date | null;
  prazoAcoradado: Date;
  tipoDeAnalise: string;
  descricaoDosServicos: string;
  informacoesAdicionais: string;
  modoEnvioResultado: string;
  dataEnvioResultados: Date | null;
  responsavelPeloEnvio: string;
  solicitanteCnpj: string;
}

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

const DetalhesSolicitacoesDeAnalise = () => {
  const { id } = useParams();
  const solicitacao = useSelector((state: any) =>
    state.solicitacoes.solicitacoes.filter(
      (solicitacao: SolicitacoesState) => solicitacao.id === id
    )
  );

  const solicitante = useSelector((state: any) =>
    state.solicitantes.solicitantes.filter(
      (solicitante: SolicitanteState) =>
        solicitante.cnpj === solicitacao[0].solicitanteCnpj
    )
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="w-5/6 mx-auto mt-7">
        <div className="border-b border-b-gray-900/10 pb-7">
          <h2 className="text-gray-900 font-semibold leading-7 font-inter">
            Informações da solicitação de análise
          </h2>
          <p className="font-inter mt-1 text-sm leading-6 text-gray-600">
            Informações da solicitação de análise e seus itens de análise
          </p>
        </div>
        <div>
          <dl className="divide-y divide-gray-900/10">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                ID
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {solicitacao[0].id}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Nome do Projeto
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {solicitacao[0].nomeProjeto}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Solicitante
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {solicitante[0].nome}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Data de abertura da solicitação de análise
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {new Date(solicitacao[0].aberturaSA).toLocaleDateString(
                  "pt-BR",
                  {
                    timeZone: "America/Sao_Paulo",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }
                )}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Data de entrada dos materiais no laboratório
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {solicitacao[0].entradaDosMateriais
                  ? new Date(
                      solicitacao[0].entradaDosMateriais
                    ).toLocaleDateString("pt-BR", {
                      timeZone: "America/Sao_Paulo",
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                  : "Materias não recebidos!"}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Data de inicio do projeto
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {solicitacao[0].inicioDoProjeto
                  ? new Date(solicitacao[0].inicioDoProjeto).toLocaleDateString(
                      "pt-BR",
                      {
                        timeZone: "America/Sao_Paulo",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }
                    )
                  : "Projeto não iniciado!"}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Data de conclusão do projeto
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {solicitacao[0].conclusaoDoProjeto
                  ? new Date(
                      solicitacao[0].conclusaoDoProjeto
                    ).toLocaleDateString("pt-BR", {
                      timeZone: "America/Sao_Paulo",
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                  : "Projeto não concluído!"}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Prazo de conclusão acordado
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {new Date(solicitacao[0].prazoAcordado).toLocaleDateString(
                  "pt-BR",
                  {
                    timeZone: "America/Sao_Paulo",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }
                )}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Tipo de análise
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {keyMap[solicitacao[0].tipoDeAnalise]}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Descrição dos serviços
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {solicitacao[0].descricaoDosServicos}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Informações adicionais
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {solicitacao[0].informacoesAdicionais}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Modo de envio dos resultados
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {solicitacao[0].modoEnvioResultado}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Data de envio dos resultados
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {solicitacao[0].dataEnvioResultados
                  ? new Date(
                      solicitacao[0].dataEnvioResultados
                    ).toLocaleDateString("pt-BR", {
                      timeZone: "America/Sao_Paulo",
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                  : "Resultados não enviados!"}
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Responsável pelo envio
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {solicitacao[0].responsavelPeloEnvio
                  ? solicitacao[0].responsavelPeloEnvio
                  : "Resultados não enviados!"}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default DetalhesSolicitacoesDeAnalise;
