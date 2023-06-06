import axios from "axios";
import jsPDF from "jspdf";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

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

const GerarRelatorioAnalise = () => {
  const template = useRef<any>(null);
  const [solicitacaoDeAnalise, setSolicitacaoDeAnalise] = useState<any>();
  const { id } = useParams();

  const getSolicitacaoDeAnalise = async () => {
    const response = await axios.get(
      `https://uno-production.up.railway.app/solicitacoes-de-analise/${id}`
    );
    console.log(response.data);
    setSolicitacaoDeAnalise(response.data);
  };

  useEffect(() => {
    getSolicitacaoDeAnalise();
  }, []);

  const handleGerarRelatorio = () => {
    const doc = new jsPDF({
      format: [1400, 1100],
      orientation: "landscape",
      unit: "px",
    });

    doc.html(template.current, {
      async callback(doc) {
        doc.save("relatorio.pdf");
      },
    });
  };

  return solicitacaoDeAnalise ? (
    <div>
      <div className="flex justify-between">
      <button
        className="text-white text-sm py-2 px-3 bg-indigo-600 rounded-md m-5"
        onClick={handleGerarRelatorio}
      >
        Baixar Relatório
      </button>
      <Link
      to={`/solicitacoes-de-analise/${id}`}
        className="text-white text-sm py-2 px-3 bg-indigo-600 rounded-md m-5"
      >
        Voltar
      </Link>
      </div>
      <div ref={template}>
        <div className="grid grid-cols-6 w-full p-5">
          <div className="col-span-6">
            <p className="font-inter text-xl font-semibold border text-center p-1 text-gray-800">
              Relatório de análise
            </p>
          </div>
          <div className="col-span-6 p-1 font-medium text-sm text-gray-800">
            <p>Informações do solicitante</p>
          </div>
          <div className="col-span-2 flex gap-3 border p-1 text-sm text-gray-800">
            <p className="font-semibold">CNPJ:</p>
            <p>
              {solicitacaoDeAnalise.solicitacaoDeAnalise.Solicitante.cnpj.slice(
                0,
                2
              ) +
                "." +
                solicitacaoDeAnalise.solicitacaoDeAnalise.Solicitante.cnpj.slice(
                  2,
                  5
                ) +
                "." +
                solicitacaoDeAnalise.solicitacaoDeAnalise.Solicitante.cnpj.slice(
                  5,
                  8
                ) +
                "/" +
                solicitacaoDeAnalise.solicitacaoDeAnalise.Solicitante.cnpj.slice(
                  8,
                  12
                ) +
                "-" +
                solicitacaoDeAnalise.solicitacaoDeAnalise.Solicitante.cnpj.slice(
                  12,
                  14
                )}
            </p>
          </div>
          <div className="col-span-4 flex gap-3 border p-1 text-sm text-gray-800">
            <p className="font-semibold">Solicitante:</p>
            <p>Uno LIMS</p>
          </div>
          <div className="col-span-2 flex gap-3 border p-1 text-sm text-gray-800">
            <p className="font-semibold">CEP:</p>
            <p>
              {solicitacaoDeAnalise.solicitacaoDeAnalise.Solicitante.cep.slice(
                0,
                5
              ) +
                "-" +
                solicitacaoDeAnalise.solicitacaoDeAnalise.Solicitante.cep.slice(
                  5
                )}
            </p>
          </div>
          <div className="col-span-3 flex gap-3 border p-1 text-sm text-gray-800">
            <p className="font-semibold">Endereço:</p>
            <p>
              {solicitacaoDeAnalise.solicitacaoDeAnalise.Solicitante.endereco}
            </p>
          </div>
          <div className="col-span-1 flex gap-3 border p-1 text-sm text-gray-800">
            <p className="font-semibold">Número:</p>
            <p>
              {solicitacaoDeAnalise.solicitacaoDeAnalise.Solicitante.numero}
            </p>
          </div>
          <div className="col-span-2 flex gap-3 border p-1 text-sm text-gray-800">
            <p className="font-semibold">Cidade:</p>
            <p>
              {solicitacaoDeAnalise.solicitacaoDeAnalise.Solicitante.cidade}
            </p>
          </div>
          <div className="col-span-1 flex gap-3 border p-1 text-sm text-gray-800">
            <p className="font-semibold">Estado:</p>
            <p>
              {solicitacaoDeAnalise.solicitacaoDeAnalise.Solicitante.estado}
            </p>
          </div>
          <div className="col-span-3 flex gap-3 border p-1 text-sm text-gray-800">
            <p className="font-semibold">Responsável:</p>
            <p>
              {
                solicitacaoDeAnalise.solicitacaoDeAnalise.Solicitante
                  .responsavel
              }
            </p>
          </div>
          <div className="col-span-3 flex gap-3 border p-1 text-sm text-gray-800">
            <p className="font-semibold">Telefone:</p>
            <p>
              {" "}
              {"(" +
                solicitacaoDeAnalise.solicitacaoDeAnalise.Solicitante.telefone.slice(
                  0,
                  2
                ) +
                ") " +
                solicitacaoDeAnalise.solicitacaoDeAnalise.Solicitante.telefone.slice(
                  2,
                  3
                ) +
                " " +
                solicitacaoDeAnalise.solicitacaoDeAnalise.Solicitante.telefone.slice(
                  3,
                  7
                ) +
                "-" +
                solicitacaoDeAnalise.solicitacaoDeAnalise.Solicitante.telefone.slice(
                  7
                )}
            </p>
          </div>
          <div className="col-span-3 flex gap-3 border p-1 text-sm text-gray-800">
            <p className="font-semibold">Email:</p>
            <p>{solicitacaoDeAnalise.solicitacaoDeAnalise.Solicitante.email}</p>
          </div>
          <div className="col-span-6 p-1 text-gray-800 font-medium text-sm">
            <p>Solicitação de Análise</p>
          </div>
          <div className="col-span-1 flex gap-3 border p-1 text-sm text-gray-800">
            <p className="font-semibold">ID:</p>
            <p>{solicitacaoDeAnalise.solicitacaoDeAnalise.id}</p>
          </div>
          <div className="col-span-3 flex gap-3 border p-1 text-sm text-gray-800">
            <p className="font-semibold">Nome do projeto:</p>
            <p>{solicitacaoDeAnalise.solicitacaoDeAnalise.nomeProjeto}</p>
          </div>
          <div className="col-span-2 flex gap-3 border p-1 text-sm text-gray-800">
            <p className="font-semibold">Abertura da SA:</p>
            <p>
              {new Date(
                solicitacaoDeAnalise.solicitacaoDeAnalise.entradaDosMateriais
              ).toLocaleDateString("pt-BR", {
                timeZone: "America/Sao_Paulo",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </p>
          </div>
          <div className="col-span-2 flex gap-3 border p-1 text-sm text-gray-800">
            <p className="font-semibold">Inicio do projeto:</p>
            <p>
              {solicitacaoDeAnalise.solicitacaoDeAnalise.inicioDoProjeto
                ? new Date(
                    solicitacaoDeAnalise.solicitacaoDeAnalise.inicioDoProjeto
                  ).toLocaleDateString("pt-BR", {
                    timeZone: "America/Sao_Paulo",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                : "Projeto não iniciado!"}
            </p>
          </div>
          <div className="col-span-4 flex gap-3 border p-1 text-sm text-gray-800">
            <p className="font-semibold">
              Entrada dos materiais no laboratório:
            </p>
            <p>
              {solicitacaoDeAnalise.solicitacaoDeAnalise.entradaDosMateriais
                ? new Date(
                    solicitacaoDeAnalise.solicitacaoDeAnalise.entradaDosMateriais
                  ).toLocaleDateString("pt-BR", {
                    timeZone: "America/Sao_Paulo",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                : "Materias não recebidos!"}
            </p>
          </div>
          <div className="col-span-3 flex gap-3 border p-1 text-sm text-gray-800">
            <p className="font-semibold">Conclusão do projeto:</p>
            <p>
              {solicitacaoDeAnalise.solicitacaoDeAnalise.conclusaoDoProjeto
                ? new Date(
                    solicitacaoDeAnalise.solicitacaoDeAnalise.conclusaoDoProjeto
                  ).toLocaleDateString("pt-BR", {
                    timeZone: "America/Sao_Paulo",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                : "Projeto não concluído!"}
            </p>
          </div>
          <div className="col-span-3 flex gap-3 border p-1 text-sm text-gray-800">
            <p className="font-semibold">Prazo acordado:</p>
            <p>
              {new Date(
                solicitacaoDeAnalise.solicitacaoDeAnalise.prazoAcordado
              ).toLocaleDateString("pt-BR", {
                timeZone: "America/Sao_Paulo",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </p>
          </div>
          <div className="col-span-3 flex gap-3 border p-1 text-sm text-gray-800">
            <p className="font-semibold">Tipo de Análise:</p>
            <p>
              {keyMap[solicitacaoDeAnalise.solicitacaoDeAnalise.tipoDeAnalise]}
            </p>
          </div>
          <div className="col-span-3 flex gap-3 border p-1 text-sm text-gray-800">
            <p className="font-semibold">Modo de envio dos resultados:</p>
            <p>
              {solicitacaoDeAnalise.solicitacaoDeAnalise.modoEnvioResultado}
            </p>
          </div>
          <p className="font-semibold col-span-1 text-sm text-gray-800 p-1 border">
            Descrição dos Serviços:
          </p>
          <p className="col-span-5 p-1 text-gray-800 text-sm border">
            {solicitacaoDeAnalise.solicitacaoDeAnalise.descricaoDosServicos}
          </p>
          <div className="col-span-6 px-1 py-2 text-gray-800 font-medium text-base border">
            <p>Resultados</p>
          </div>
          {solicitacaoDeAnalise.solicitacaoDeAnalise.itensDeAnalise.map(
            (item: any) => (
              <div className="col-span-6 flex gap-3 border p-1 text-sm text-gray-800 flex-col">
                <div className="flex gap-5">
                  <p className="font-semibold col-span-3">Item de Análise:</p>
                  <p className="col-span-3">{item.id} - {item.tipoMaterial}</p>
                </div>
                {item.Ensaio.map((ensaio: any) => (
                  <div className="col-span-6 flex pl-10 gap-3 p-1 text-sm text-gray-800">
                    <p>
                      <span className="font-semibold pl-5 pr-2">Ensaio:</span>
                      <span className="ml-0.5">{ensaio.nomeEnsaio}</span>
                      <span className="font-semibold ml-10 m-2">
                        Especificação:
                      </span>
                      <span className="ml-0.5">{ensaio.especificacao}</span>
                      <span className="font-semibold ml-10 m-2">
                        Resultado:
                      </span>
                      <span className="ml-0.5">{ensaio.resultado}</span>
                    </p>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default GerarRelatorioAnalise;
