import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Navbar from "../../../components/navbar/Navbar.tsx";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import Select from "react-tailwindcss-select";

interface CadastrarSolicitacaoDeAnaliseRequest {
  nomeProjeto: string;
  prazoAcordado: string;
  tipoDeAnalise: string;
  descricaoDosServicos: string;
  informacoesAdicionais: string;
  modoEnvioResultado: string;
  solicitante: string;
  responsavelAbertura: string;
}

const tipoDeAnaliseOptions = [
  { value: "", label: "Selecione o tipo de analise" },
  { value: "Desenvolvimento", label: "Desenvolvimento" },
  { value: "Degradacao_Forcada", label: "Degradação Forçada" },
  { value: "Validacao", label: "Validação" },
  { value: "Controle", label: "Controle" },
  { value: "Solubilidade", label: "Solubilidade" },
  { value: "Estabilidade", label: "Estabilidade" },
  { value: "Perfil_de_Dissolucao", label: "Perfil de Dissolução" },
  { value: "Solventes_Residuais", label: "Solventes Residuais" },
  { value: "Sumario_de_Validacao", label: "Sumario de Validação" },
];

const modoDeEnvioOptions = [
  { value: "VIRTUAL", label: "Virtual" },
  { value: "CORREIOS", label: "Correios" },
];

const solicitantesOptions = [
  { value: "", label: "Selecione o solicitante" },
];

const CadastrarSolicitacaoDeAnalise = () => {
  const [modoEnvioResultado, setModoEnvioResultado] = useState(
    modoDeEnvioOptions[0]
  );
  const [tipoDeAnalise, setTipoDeAnaliseResultado] = useState(
    tipoDeAnaliseOptions[0]
  );

  const [loading, setLoading] = useState(true);

  const [solicitante, setSolicitante] = useState(solicitantesOptions[0]);

  const [open, setOpen] = useState(false);
  const usuario = useSelector((state: any) => state.auth.userInfo.nome);

  const changeModoEnvio = (value: any) => {
    console.log("value:", value);
    setModoEnvioResultado(value);
    formik.setFieldValue("modoEnvioResultado", value.value);
  };

  const changeSolicitante = (value: any) => {
    console.log("value:", value);
    setSolicitante(value);
    formik.setFieldValue("solicitante", value.value);
  };

  const changeTipoDeAnalise = (value: any) => {
    console.log("value:", value.value);
    setTipoDeAnaliseResultado(value);
    formik.setFieldValue("tipoDeAnalise", value.value);
  };

  const getSolicitantes = async () => {
    const data = await axios.get(
      "https://uno-production.up.railway.app/solicitantes"
    );

    const solicitantes = data.data

    solicitantes.forEach((solicitante: { cnpj: any; nome: any; }) => {
      solicitantesOptions.push({ value: solicitante.cnpj, label: solicitante.nome })
    });

    setLoading(false);

    console.log(solicitantesOptions)
  };

  useEffect(() => {
    getSolicitantes();
  }, []);
  const cancelButtonRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      nomeProjeto: "",
      prazoAcordado: "",
      tipoDeAnalise: "",
      descricaoDosServicos: "",
      informacoesAdicionais: "",
      modoEnvioResultado: "",
      solicitante: "",
      responsavelAbertura: usuario,
    },

    validationSchema: yup.object().shape({
      nomeProjeto: yup.string().required("Campo obrigatório!"),
      tipoDeAnalise: yup.string().required("Campo obrigatório!"),
      descricaoDosServicos: yup.string().required("Campo obrigatório!"),
      informacoesAdicionais: yup.string().nullable(),
      modoEnvioResultado: yup.string().required("Campo obrigatório!"),
      solicitante: yup
        .string()
        .required("Campo obrigatório!")
        .length(14, "CNPJ deve ter 14 dígitos!"),
    }),

    onSubmit: async (values: CadastrarSolicitacaoDeAnaliseRequest) => {
      try {
        console.log("values:", values);
        //yyyy-MM-dd
        await axios.post(
          "https://uno-production.up.railway.app/solicitacoes-de-analise",
          values
        );
        setOpen(true);
        setModoEnvioResultado(modoDeEnvioOptions[0]);
        setTipoDeAnaliseResultado(tipoDeAnaliseOptions[0]);
        setSolicitante(solicitantesOptions[0]);
        formik.resetForm();
      } catch (error: any) {
        console.log(error);
      }
    },
  });

  return (
    loading ? (<div></div>) : <div>
    <Navbar />
    <form className="mx-auto w-5/6 my-7" onSubmit={formik.handleSubmit}>
      <div className="space-y-12 ">
        <div className="border-b border-gray-900/10 pb-7">
          <h2 className="text-base font-inter font-semibold leading-7 text-gray-900">
            Cadastrar Solicitação de Análise
          </h2>
          <p className="font-inter mt-1 text-sm leading-6 text-gray-600">
            Preencha abaixo cuidadosamente as informações da solicitação de
            análise.
          </p>
        </div>
      </div>

      <div className="border-b border-gray-900/10 pb-12">
        <div className="mt-7 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-2">
            <label
              htmlFor="solicitante"
              className="block text-sm font-medium leading-6 text-gray-900 font-inter"
            >
              Solicitante
            </label>
            <div className="mt-2 relative">
              <Select
                onChange={changeSolicitante}
                value={solicitante}
                isSearchable={true}
                options={solicitantesOptions}
                primaryColor="indigo"
              />
            </div>
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="nome"
              className="block text-sm font-medium leading-6 text-gray-900 font-inter"
            >
              Nome do projeto
            </label>
            <div className="mt-2 relative">
              <input
                onChange={formik.handleChange}
                value={formik.values.nomeProjeto}
                onBlur={formik.handleBlur}
                type="text"
                name="nomeProjeto"
                id="nomeProjeto"
                autoComplete="nomeProjeto"
                className={`${
                  formik.touched.nomeProjeto && formik.errors.nomeProjeto
                    ? "focus:ring-red-500 ring-red-500"
                    : "focus:ring-indigo-600"
                } text-sm py-2 px-3 rounded-md shadow-sm ring-1 font-inter ring-gray-300 ring-inset focus:ring-2 focus:ring-inset focus:outline-none w-full`}
              />
              <p className="absolute -top-2 right-6 text-xs text-red-500 bg-white px-2 font-inter">
                {formik.errors.nomeProjeto && formik.touched.nomeProjeto
                  ? formik.errors.nomeProjeto
                  : ""}
              </p>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="cnpj"
              className="block text-sm font-medium leading-6 text-gray-900 font-inter"
            >
              Prazo acordado
            </label>
            <div className="relative mt-2">
              <input
                onChange={formik.handleChange}
                value={formik.values.prazoAcordado}
                onBlur={formik.handleBlur}
                type="date"
                name="prazoAcordado"
                id="prazoAcordado"
                autoComplete="prazoAcordado"
                className={`${
                  formik.touched.prazoAcordado && formik.errors.prazoAcordado
                    ? "focus:ring-red-500 ring-red-500"
                    : "focus:ring-indigo-600"
                } text-sm py-2 px-3 rounded-md shadow-sm font-inter ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-inset focus:outline-none w-full`}
              />
              <p className="absolute -top-2 right-6 text-xs text-red-500 bg-white px-2 font-inter">
                {formik.errors.prazoAcordado && formik.touched.prazoAcordado
                  ? formik.errors.prazoAcordado
                  : ""}
              </p>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="endereco"
              className="block text-sm font-medium leading-6 text-gray-900 font-inter"
            >
              Tipo de análise
            </label>
            <div className="mt-2 relative">
              <Select
                options={tipoDeAnaliseOptions}
                onChange={changeTipoDeAnalise}
                value={tipoDeAnalise}
                primaryColor="indigo"
              />

              <p className="absolute -top-2 right-6 text-xs text-red-500 bg-white px-2 font-inter">
                {formik.errors.tipoDeAnalise && formik.touched.tipoDeAnalise
                  ? formik.errors.tipoDeAnalise
                  : ""}
              </p>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="numero"
              className="block font-inter text-sm font-medium leading-6 text-gray-900"
            >
              Descrição dos serviços
            </label>
            <div className="mt-2 relative">
              <textarea
                rows={5}
                onChange={formik.handleChange}
                value={formik.values.descricaoDosServicos}
                onBlur={formik.handleBlur}
                name="descricaoDosServicos"
                id="descricaoDosServicos"
                autoComplete="descricaoDosServicos"
                className={`${
                  formik.touched.descricaoDosServicos &&
                  formik.errors.descricaoDosServicos
                    ? "focus:ring-red-500 ring-red-500"
                    : "focus:ring-indigo-600"
                } text-sm py-2 px-3 font-inter rounded-md shadow-sm ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-inset focus:outline-none w-full resize-none`}
              />
              <p className="absolute -top-2 right-6 text-xs text-red-500 bg-white px-2 font-inter">
                {formik.errors.descricaoDosServicos &&
                formik.touched.descricaoDosServicos
                  ? formik.errors.descricaoDosServicos
                  : ""}
              </p>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="cidade"
              className="block text-sm font-medium leading-6 text-gray-900 font-inter"
            >
              Informações adicionais
            </label>
            <div className="mt-2 relative">
              <textarea
                rows={5}
                onChange={formik.handleChange}
                value={formik.values.informacoesAdicionais}
                onBlur={formik.handleBlur}
                name="informacoesAdicionais"
                id="informacoesAdicionais"
                autoComplete="informacoesAdicionais"
                className={`${
                  formik.touched.informacoesAdicionais &&
                  formik.errors.informacoesAdicionais
                    ? "focus:ring-red-500 ring-red-500"
                    : "focus:ring-indigo-600"
                } text-sm py-2 px-3 rounded-md font-inter shadow-sm ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-inset focus:outline-none w-full resize-none`}
              />
              <p className="absolute -top-2 right-6 text-xs text-red-500 bg-white px-2 font-inter">
                {formik.errors.informacoesAdicionais &&
                formik.touched.informacoesAdicionais
                  ? formik.errors.informacoesAdicionais
                  : ""}
              </p>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="estado"
              className="block text-sm font-medium leading-6 text-gray-900 font-inter"
            >
              Modo de envio dos resultados
            </label>
            <div className="mt-2 relative">
              <Select
                options={modoDeEnvioOptions}
                onChange={changeModoEnvio}
                value={modoEnvioResultado}
                primaryColor="indigo"
              />
              <p className="absolute -top-2 right-6 text-xs text-red-500 bg-white px-2 font-inter">
                {formik.errors.modoEnvioResultado &&
                formik.touched.modoEnvioResultado
                  ? formik.errors.modoEnvioResultado
                  : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 font-inter"
        >
          Cadastrar
        </button>
      </div>
    </form>

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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-1">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-semibold leading-6 text-gray-900 font-inter"
                      >
                        Solicitanção cadastrada
                      </Dialog.Title>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto font-inter"
                    onClick={() => setOpen(false)}
                  >
                    Ok
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  </div>
  );
};

export default CadastrarSolicitacaoDeAnalise;
