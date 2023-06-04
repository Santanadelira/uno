import { createSlice } from "@reduxjs/toolkit";

interface SolicitanteState {
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
}

const initialState = {
  solicitantes: [],
};

const solicitantesSlice = createSlice({
  name: "solicitantes",
  initialState,
  reducers: {
    setSolicitantes: (state, action) => {
      state.solicitantes = action.payload.solicitantes;
    },
    procurarPorNome: (state, action) => {
      return {
        ...state,
        users: [...state.solicitantes].filter((solicitante: SolicitanteState) =>
          solicitante.nome.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    },
    clearSolicitantes: (state) => {
      state.solicitantes = [];
      return state
    }
  },
});

export const { setSolicitantes, procurarPorNome, clearSolicitantes } = solicitantesSlice.actions;

export default solicitantesSlice.reducer;

export const selectSolicitantes = (state: any) =>
  state.solicitantes.solicitantes;
export const filterSolicitantes = (state: any, nome: string) =>
  state.solicitantes.solicitantes.filter((solicitante: SolicitanteState) =>
    solicitante.nome.includes(nome)
  );