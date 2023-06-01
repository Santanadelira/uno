export enum Cargo {
  ADMIN,
  ANALISTA,
  VENDEDOR,
  EXPEDICAO,
}

export enum TipoDeAnalise {
  Desenvolvimento,
  Degradacao_Forcada,
  Validacao,
  Controle,
  Solubilidade,
  Estabilidade,
  Perfil_de_Dissolucao,
  Solventes_Residuais,
  Sumario_de_Validacao,
}

export enum Ensaios {
  Desintegracao,
  Dissolucao,
  pH,
  Dureza,
  Friabilidade,
  Umidade,
  Viscosidade,
  Solubilidade,
  Teor_do_Ativo,
  Teor_de_Impurezas,
  Particulas_Visiveis,
  Peso_Medio,
  Karl_Fischer,
}

export enum ModoDeEnvioResultado {
  VIRTUAL,
  VALER,
  CLIENTE,
  CORREIOS,
}

export enum StatusEnsaio {
  Pendente,
  EmAnalise,
  Concluida,
}
