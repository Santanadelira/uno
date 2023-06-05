interface PaginacaoProps {
  totalItens: number;
  itensPorPagina: number;
  setPaginaAtual: (value: number) => void;
  paginaAtual: number;
}

const Paginacao = ({
  totalItens,
  itensPorPagina,
  setPaginaAtual,
  paginaAtual,
}: PaginacaoProps) => {
  const paginaAnterior = () => {
    paginaAtual--;
    setPaginaAtual(paginaAtual);
  };

  const proximaPagina = () => {
    paginaAtual++;
    setPaginaAtual(paginaAtual);
  };

  const primeiraPagina = paginaAtual === 1;
  const ultimaPagina =
    paginaAtual === Math.ceil(totalItens / itensPorPagina);

  return (
    <div className="flex items-center gap-3 justify-end border-t border-gray-200 px-4 py-3 sm:px-6">
      <button onClick={paginaAnterior} disabled={primeiraPagina} className={`px-2 shadow-sm rounded-md font-inter py-2 font-medium text-gray-700 text-sm border border-gray-300 ${primeiraPagina ? "bg-gray-200 text-gray-400/100" : "bg-white hover:bg-indigo-600 hover:border-white hover:text-white"}`}>
        Anterior
      </button>
      <button onClick={proximaPagina} disabled={ultimaPagina} className={`px-2 shadow-sm rounded-md font-inter py-2 font-medium text-gray-700 text-sm border border-gray-300 ${ultimaPagina ? "bg-gray-200 text-gray-400/100" : "bg-white hover:bg-indigo-600 hover:border-white hover:text-white"}`}>
        Próxima
      </button>
    </div>
  );
};

export default Paginacao;