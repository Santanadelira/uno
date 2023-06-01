import {
  Cargo,
  Ensaios,
  ModoDeEnvioResultado,
  StatusEnsaio,
  TipoDeAnalise,
} from "./enums";

export class Usuario {
  id: string;
  nome: string;
  email: string;
  senha: string | null;
  cargo: Cargo;

  constructor(
    id: string,
    nome: string,
    email: string,
    senha: string | null,
    cargo: unknown
  ) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha ;
    this.cargo = cargo as Cargo;
  }
}

export class Solicitante {
  cnpj: string;
  nome: string;
  cep: string;
  endereco: string;
  numero: string;
  cidade: string;
  estado: string;
  responsavel: string;
  telefone: string;
  email: string;
  solicitacoesDeAnalise: SolicitacaoDeAnalise[] | null;

  constructor(
    cnpj: string,
    nome: string,
    cep: string,
    endereco: string,
    numero: string,
    cidade: string,
    estado: string,
    responsavel: string,
    telefone: string,
    email: string,
    solicitacoesDeAnalise: SolicitacaoDeAnalise[] | null
  ) {
    this.cnpj = cnpj;
    this.nome = nome;
    this.cep = cep;
    this.endereco = endereco;
    this.numero = numero;
    this.cidade = cidade;
    this.estado = estado;
    this.responsavel = responsavel;
    this.telefone = telefone;
    this.email = email;
    this.solicitacoesDeAnalise = solicitacoesDeAnalise;
  }
}

export class SolicitacaoDeAnalise {
  id: string;
  nomeProjeto: string;
  aberturaSA: Date;
  inicioDoProjeto: Date | null;
  entradaDosMaterias: Date | null;
  conclusaoDoProjeto: Date | null;
  prazoAcordado: Date;
  tipoDeAnalise: TipoDeAnalise;
  descricaoDosServicos: string;
  ensaios: Ensaios[];
  informacoesAdicionais: string | null;
  modoEnvioResultados: ModoDeEnvioResultado;
  responsavelPeloEnvio: string | null;
  dataEnvioResultados: Date | null;
  responsavelAbertura: string;
  solicitante: Solicitante;
  itensAnalise: ItemDeAnalise[] | null;

  constructor(
    id: string,
    nomeProjeto: string,
    aberturaSa: Date,
    inicioDoProjeto: Date | null,
    entradaDosMaterias: Date | null,
    conclusaoProjeto: Date | null,
    prazoAcordado: Date,
    tipoDeAalise: unknown,
    descricaoDosServicos: string,
    ensaios: Ensaios[],
    informacoesAdicionas: string | null,
    modoEnvioResultado: unknown,
    responsavelPeloEnvio: string | null,
    dataEnvioResultados: Date | null,
    responsavelAbertura: string,
    solicitante: Solicitante,
    itensAnalise: ItemDeAnalise[] | null
  ) {
    this.id = id;
    this.nomeProjeto = nomeProjeto;
    this.aberturaSA = aberturaSa;
    this.inicioDoProjeto = inicioDoProjeto;
    this.entradaDosMaterias = entradaDosMaterias;
    this.conclusaoDoProjeto = conclusaoProjeto;
    this.prazoAcordado = prazoAcordado;
    this.tipoDeAnalise = tipoDeAalise as TipoDeAnalise;
    this.descricaoDosServicos = descricaoDosServicos;
    this.ensaios = ensaios;
    this.informacoesAdicionais = informacoesAdicionas;
    this.modoEnvioResultados = modoEnvioResultado as ModoDeEnvioResultado;
    this.responsavelPeloEnvio = responsavelPeloEnvio;
    this.dataEnvioResultados = dataEnvioResultados;
    this.responsavelAbertura = responsavelAbertura;
    this.solicitante = solicitante;
    this.itensAnalise = itensAnalise;
  }
}

export class ItemDeAnalise {
  id: string;
  quantidade: number;
  unidade: string;
  tipoMaterial: string;
  lote: string | null;
  notaFiscal: string | null;
  condicao: string | null;
  observacao: string | null;
  solicitacaoDeAnalise: SolicitacaoDeAnalise;
  ensaios: Ensaio[] | null;

  constructor(
    id: string,
    quantidade: number,
    unidade: string,
    tipoMaterial: string,
    lote: string | null,
    notaFiscal: string | null,
    condicao: string | null,
    observacao: string | null,
    solicitacaoDeAnalise: SolicitacaoDeAnalise,
    ensaios: Ensaio[] | null
  ) {
    this.id = id;
    this.quantidade = quantidade;
    this.unidade = unidade;
    this.tipoMaterial = tipoMaterial;
    this.lote = lote;
    this.notaFiscal = notaFiscal;
    this.condicao = condicao;
    this.observacao = observacao;
    this.solicitacaoDeAnalise = solicitacaoDeAnalise;
    this.ensaios = ensaios;
  }
}

export class Ensaio {
  id: string;
  nomeEnsaio: Ensaios;
  especificao: string;
  dataDeAnalise: Date | null;
  statusEnsaio: StatusEnsaio;
  resultado: string | null;
  itemDeAnalise: ItemDeAnalise;

  constructor(
    id: string,
    nomeEnsaio: unknown,
    especificacao: string,
    dataDeAnalise: Date | null,
    statusEnsaio: unknown,
    resultado: string | null,
    itemDeAnalise: ItemDeAnalise
  ) {
    this.id = id;
    this.nomeEnsaio = nomeEnsaio as Ensaios;
    this.especificao = especificacao;
    this.dataDeAnalise = dataDeAnalise;
    this.statusEnsaio = statusEnsaio as StatusEnsaio;
    this.resultado = resultado;
    this.itemDeAnalise = itemDeAnalise;
  }
}
