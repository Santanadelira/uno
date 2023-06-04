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

const solicitacoesSlice = createSlice({
  name: "solicitacoes",
  initialState,
  reducers: {
    setSolicitacoes: (state, action) => {
      state.solicitacoes = action.payload.solicitacoes;
    },
    procurarPorNome: (state, action) => {
      return {
        ...state,
        users: [...state.solicitacoes].filter((solicitacoes: SolicitacoesState) =>
          solicitacoes.nomeProjeto.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    },
    clearSolicitacoes: (state) => {
      state.solicitacoes = [];
      return state
    }
  },
});

export const { setSolicitacoes, procurarPorNome, clearSolicitacoes } = solicitacoesSlice.actions;

export default solicitacoesSlice.reducer;

export const selectSolicitacoes = (state: any) =>
  state.solicitacoes.solicitacoes;
export const filterSolicitacoes = (state: any, nome: string) =>
  state.solicitacoes.solicitacoes.filter((solicitacoes: SolicitacoesState) =>
    solicitacoes.nomeProjeto.includes(nome)
  );