import { useParams } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import Tabela from "../../../components/tabela/Tabela";
import { Transition, Dialog } from "@headlessui/react";
import * as yup from "yup";
import { Fragment, useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import Select from "react-tailwindcss-select";
import axios from "axios";

const ensaios = [
  { value: "", label: "Selecione o ensaio a ser feito" },
  { value: "Desintegrracao", label: "Desintegração" },
  { value: "Dissolucao", label: "Dissolução" },
  { value: "pH", label: "pH" },
  { value: "Dureza", label: "Dureza" },
  { value: "Friabilidade", label: "Friabilidade" },
  { value: "Umidade", label: "Umidade" },
  { value: "Viscosidade", label: "Viscosidade" },
  { value: "Solubilidade", label: "Solubilidade" },
  { value: "Teor_do_Ativo", label: "Teor do ativo" },
  { value: "Teor_de_Impurezas", label: "Teor de impurezas" },
  { value: "Particulas_Visiveis", label: "Particulas visíveis" },
  { value: "Peso_Medio", label: "Peso médio" },
  { value: "Karl_Fischer", label: "Karl Fischer" },
];

interface ItemDeAnalise {
  id: string;
  quantidadeRecebida: number;
  quantidadeDisponivel: number;
  unidade: string;
  tipoMaterial: string;
  lote: string | null;
  notaFiscal: string | null;
  condicao: string | null;
  observacao: string | null;
  solicitacaoDeAnalise: any;
  Ensaio: [];
}

const DetalhesItensDeAnalise = () => {
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = useState(false);
  const [ensaio, setEnsaio] = useState(ensaios[0]);
  const [itemDeAnalise, setItemDeAnalise] = useState<ItemDeAnalise>();
  const cancelButtonRef = useRef(null);

  const dados: any = [];  

    itemDeAnalise &&
      itemDeAnalise.Ensaio &&
      itemDeAnalise.Ensaio.map((ensaio: any) =>
        dados.push({
          id: ensaio.id,
          itemRota: ensaio.id,
          nome: ensaio.nomeEnsaio,
          info1: ensaio.statusEnsaio,
          info2: ensaio.especificacao,
        })
      );

  const changeEnsaio = (value: any) => {
    setEnsaio(value);
    formik.setFieldValue("nomeEnsaio", value.value);
  };

  const procurarItemDeAnalise = async () => {
    try {
      const response = await axios.get(
        `https://uno-production.up.railway.app/itens-de-analise/${id}`
      );
      setItemDeAnalise(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    procurarItemDeAnalise();
  }, []);


  const formik = useFormik({
    initialValues: {
      itemDeAnaliseId: id,
      nomeEnsaio: "",
      especificacao: "",
    },

    validationSchema: yup.object().shape({
      nomeEnsaio: yup.string().required("Campo obrigatório"),
      especificacao: yup.string().required("Campo obrigatório"),
    }),

    onSubmit: async (values) => {
      try {
        //yyyy-MM-dd
        await axios.post(
          "https://uno-production.up.railway.app/ensaios",
          values
        );
        setEnsaio(ensaios[0]);
        setOpen(false);
        formik.resetForm();
        procurarItemDeAnalise();
      } catch (error: any) {
        console.log(error);
      }
    },
  });

  return itemDeAnalise ? (
    
      <div>
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
                  {itemDeAnalise && itemDeAnalise.id}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Tipo de material
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {itemDeAnalise && itemDeAnalise.tipoMaterial}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Nota Fiscal
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {itemDeAnalise && itemDeAnalise.notaFiscal}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Lote
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {itemDeAnalise && itemDeAnalise.lote}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Condição
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {itemDeAnalise && itemDeAnalise.condicao}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Tipo de Análise
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {itemDeAnalise &&
                    itemDeAnalise.solicitacaoDeAnalise.tipoDeAnalise}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Quantidade recebida
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {itemDeAnalise && itemDeAnalise.quantidadeRecebida}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Quantidade disponível para análise
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {itemDeAnalise && itemDeAnalise.quantidadeDisponivel}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Unidade
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {itemDeAnalise && itemDeAnalise.unidade}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Observação
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {itemDeAnalise && itemDeAnalise.observacao}
                </dd>
              </div>
            </dl>
          </div>

          <Tabela
            dados={dados}
            acao={setOpen}
            titulo="Ensaios"
            colunas={["Id", "Ensaio", "Status", "Especificação"]}
            editar={true}
            cadastrar={true}
            textoBotao="Cadastrar ensaio"
            textoPesquisa="Pesquisar ensaios"
            consultarRota="/ensaios"
          />
        </div>

        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <form
                    className="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                    onSubmit={formik.handleSubmit}
                  >
                    <Dialog.Panel className="">
                      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-1 rounded-md">
                        <div className="sm:flex sm:items-start">
                          <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                            <Dialog.Title
                              as="h3"
                              className="text-lg font-semibold leading-6 text-gray-900 font-inter"
                            >
                              Novo ensaio
                            </Dialog.Title>

                            <div className="w-full mt-7">
                              <label
                                htmlFor="nomeEnsaio"
                                className="block text-sm font-medium leading-6 text-gray-900 font-inter"
                              >
                                Ensaio
                              </label>
                              <div className="mt-2 relative w-full">
                                <Select
                                  onChange={changeEnsaio}
                                  value={ensaio}
                                  isSearchable={false}
                                  options={ensaios}
                                  primaryColor="indigo"
                                />
                                <p className="absolute -top-2 right-6 text-xs text-red-500 bg-white px-2 font-inter">
                                  {formik.errors.nomeEnsaio &&
                                  formik.touched.nomeEnsaio
                                    ? formik.errors.nomeEnsaio
                                    : ""}
                                </p>
                              </div>
                            </div>
                            <div className="w-full mt-7">
                              <label
                                htmlFor="especificacao"
                                className="block text-sm font-medium leading-6 text-gray-900 font-inter"
                              >
                                Especificação
                              </label>
                              <div className="mt-2 relative w-full">
                                <input
                                  onChange={formik.handleChange}
                                  value={formik.values.especificacao}
                                  onBlur={formik.handleBlur}
                                  type="text"
                                  name="especificacao"
                                  id="especificacao"
                                  autoComplete="especificacao"
                                  className={`${
                                    formik.touched.especificacao &&
                                    formik.errors.especificacao
                                      ? "focus:ring-red-500 ring-red-500"
                                      : "focus:ring-indigo-600"
                                  } text-sm py-2 px-3 rounded-md shadow-sm ring-1 font-inter ring-gray-300 ring-inset focus:ring-2 focus:ring-inset focus:outline-none w-full`}
                                />
                                <p className="absolute -top-2 right-6 text-xs text-red-500 bg-white px-2 font-inter">
                                  {formik.errors.especificacao &&
                                  formik.touched.especificacao
                                    ? formik.errors.especificacao
                                    : ""}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 rounded-md">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto font-inter"
                        >
                          Cadastrar
                        </button>

                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto font-inter"
                          onClick={() => setOpen(false)}
                        >
                          Cancelar
                        </button>
                      </div>
                    </Dialog.Panel>
                  </form>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    
  ) : (<div></div>);
};

export default DetalhesItensDeAnalise;
