import { createSlice } from "@reduxjs/toolkit";

interface SolicitacoesState {
    id: string;
    nomeProjeto: string
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

}

const initialState = {
  solicitacoes: [],
};

const solicitantesSlice = createSlice({
  name: "solicitacoes",
  initialState,
  reducers: {
    setSolicitacoes: (state, action) => {
      state.solicitacoes = action.payload.solicitacoes;
    },
    procurarPorNome: (state, action) => {
      return {
        ...state,
        users: [...state.solicitacoes].filter((solicitante: SolicitacoesState) =>
          solicitante.nomeProjeto.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    },
  },
});

export const { setSolicitacoes, procurarPorNome } = solicitantesSlice.actions;

export default solicitantesSlice.reducer;

export const selectSolicitacoes = (state: any) =>
  state.solicitantes.solicitantes;
export const filterSolicitacoes = (state: any, nome: string) =>
  state.solicitantes.solicitantes.filter((solicitante: SolicitacoesState) =>
    solicitante.nomeProjeto.includes(nome)
  );