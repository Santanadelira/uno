import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itensDeAnalise: [],
  ensaiosAnalise: [{ id: "", itemRota: "", nome: "", info1: "", info2: "" }],
};

const itensDeAnaliseSlice = createSlice({
  name: "itensDeAnalise",
  initialState,
  reducers: {
    setItensDeAnalise: (state, action) => {
      state.itensDeAnalise = action.payload.itensDeAnalise;
    },
  },
});

export const { setItensDeAnalise } = itensDeAnaliseSlice.actions;

export default itensDeAnaliseSlice.reducer;

export const selectItensDeAnalise = (state: any) =>
  state.itensDeAnalise.itensDeAnalise;
