import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Paginacao from "../paginacao/Paginacao";

interface TabelaProps {
  titulo: string;
  colunas: string[];
  consultarRota: string;
  textoPesquisa: string;
  dados: [
    {
      id: string;
      itemRota: string;
      nome: string;
      info1: string;
      info2: string;
    }
  ];
}

const Tabela = ({ titulo, colunas, dados, textoPesquisa, consultarRota }: TabelaProps) => {
  const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(" ");
  };

  const [nomeProcura, setNomeProcura] = useState("");
  const [dadosFiltrados, setDadosFiltrados] = useState([...dados]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;
  const ultimoIndex = paginaAtual * itensPorPagina;
  const primeiroIndex = ultimoIndex - itensPorPagina;

  const dadosPaginaAtual = dadosFiltrados.slice(
    primeiroIndex,
    ultimoIndex
  );

  const changeNomeProcura = (e: React.FormEvent<HTMLInputElement>) => {
    setNomeProcura(e.currentTarget.value);
  };

  useEffect(() => {
    setDadosFiltrados(
      dados.filter((dado) =>
        dado.nome.toLowerCase().includes(nomeProcura.toLowerCase())
      )
    );
  }, [nomeProcura]);

  return (
    <>
      <div>
        <div className="py-4 md:py-7">
          <div className="sm:flex items-center justify-between">
            <p className="text-base font-inter font-semibold leading-7 text-gray-900">
              {titulo}
            </p>
          </div>
          <div className="relative mt-7 border-b border-b-gray-900/10 pb-7">
            <input
              type="text"
              onChange={changeNomeProcura}
              className="focus:ring-indigo-600 text-sm py-2 px-3 rounded-md shadow-sm font-inter ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-inset focus:outline-none w-full"
              placeholder={textoPesquisa}
            />
            <MagnifyingGlassIcon className="h-6 w-6 absolute right-2 text-gray-800 top-1.5" />
          </div>
        </div>
        <div className="bg-white pb-5 overflow-y-auto min-h-[calc(100vh - 150px)]">
          <table className="w-full whitespace-nowrap table-fixed">
            <thead>
              <tr className="h-16 w-full text-sm leading-none text-gray-800">
                {colunas &&
                  colunas.map((coluna) => (
                    <th className="font-medium text-left pl-4">{coluna}</th>
                  ))}
              </tr>
            </thead>
            <tbody className="w-full">
              {dadosPaginaAtual &&
                dadosPaginaAtual.map((dado) => (
                  <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100 odd:bg-white even:bg-gray-100">
                    <td className="pl-4 cursor-pointer w-1/4">
                      <p className="font-inter">{dado.id}</p>
                    </td>
                    <td className="pl-4 cursor-pointer  w-1/4">
                      <p className="font-inter">{dado.nome}</p>
                    </td>
                    <td className="pl-4 cursor-pointer  w-1/4">
                      <p className="font-inter">{dado.info1}
                      </p>
                    </td>
                    <td className="pl-4 cursor-pointer  w-1/4">
                      <p className="font-inter">{dado.info2}</p>
                    </td>
                    <td className="px-7 2xl:px-0 w-1/12">
                      <Menu as="div" className="relative ml-8">
                        <Menu.Button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
                          Ações
                          <ChevronDownIcon
                            className="-mr-1 ml-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </Menu.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          
                          <Menu.Items className="absolute  z-10 -mr-1 mt-2 w-36 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to={`${consultarRota}/${dado.itemRota}`}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Consultar
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to={`${consultarRota}/${dado.id}/editar`}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Editar
                                </Link>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <Paginacao 
            itensPorPagina={itensPorPagina}
            totalItens={dadosFiltrados.length}
            setPaginaAtual={setPaginaAtual}
            paginaAtual={paginaAtual} />
        </div>
      </div>
    </>
  );
};

export default Tabela;
