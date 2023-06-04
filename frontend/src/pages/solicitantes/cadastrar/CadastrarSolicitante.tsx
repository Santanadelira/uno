import {
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Navbar from "../../../components/navbar/Navbar.tsx";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface CadastrarSolicitanteRequest {
  cnpj: string;
  nome: string;
  cep: string;
  endereco: string;
  numero: string;
  cidade: string;
  estado: string;
  responsavel: string;
  email: string;
  telefone: string;
}

const CadastrarSolicitante = () => {
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      cnpj: "",
      nome: "",
      cep: "",
      endereco: "",
      numero: "",
      cidade: "",
      estado: "",
      responsavel: "",
      email: "",
      telefone: "",
    },

    validationSchema: yup.object().shape({
      cnpj: yup
        .string()
        .required("Campo obrigatório!")
        .length(14, "O CNPJ deve conter 14 caractéres!"),
      nome: yup.string().required("Campo obrigatório!"),
      cep: yup
        .string()
        .required("Campo obrigatório!")
        .length(8, "CEP deve conter 8 caractéres!"),
      endereco: yup.string().required("Campo obrigatório!"),
      numero: yup.string().required("Campo obrigatório!"),
      cidade: yup.string().required("Campo obrigatório!"),
      estado: yup.string().required("Campo obrigatório!"),
      responsavel: yup.string().required("Campo obrigatório!"),
      email: yup
        .string()
        .required("Campo obrigatório!")
        .email("Email inválido!"),
      telefone: yup.string().required("Campo obrigatório!"),
    }),

    onSubmit: async (values: CadastrarSolicitanteRequest) => {
      try {
        await axios.post(
          "https://uno-production.up.railway.app/solicitantes/",
          values
        );
        setOpen(true);
        formik.resetForm();
      } catch (error: any) {
        if (error.response.data.error === "CNPJ já cadastrado!") {
          formik.errors.cnpj = error.response.data.error;
        }
      }
    },
  });

  const handleBuscaCep = async (e: any) => {
    e.preventDefault();
    const response = await axios.get(
      `https://viacep.com.br/ws/${formik.values.cep}/json/`
    );
    console.log(response);
    const data = response.data;
    console.log(data.erro)
    if(data.erro){
      formik.errors.cep = "CEP inválido!"
    } else {
      formik.setFieldValue("endereco", data.logradouro);
    formik.setFieldValue("cidade", data.localidade);
    formik.setFieldValue("estado", data.uf);
    }
  };

  const handleBuscaCepEnter = async (e: any) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      const response = await axios.get(
        `https://viacep.com.br/ws/${formik.values.cep}/json/`
      );
      console.log(response);
      const data = response.data;
      if(data.erro){
        formik.errors.cep = "CEP inválido!"
      } else {
        formik.setFieldValue("endereco", data.logradouro);
      formik.setFieldValue("cidade", data.localidade);
      formik.setFieldValue("estado", data.uf);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <form className="mx-auto w-5/6 my-7" onSubmit={formik.handleSubmit}>
        <div className="space-y-12 ">
          <div className="border-b border-gray-900/10 pb-7">
            <h2 className="text-base font-inter font-semibold leading-7 text-gray-900">
              Cadastrar Solicitante
            </h2>
            <p className="font-inter mt-1 text-sm leading-6 text-gray-600">
              Preencha abaixo cuidadosamente as informações do solicitante
            </p>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="font-inter text-base font-semibold leading-7 text-gray-900 mt-7">
            Informações básicas
          </h2>
          <p className="font-inter mt-1 text-sm leading-6 text-gray-600">
            Informe o cnpj e o nome fantasia do solicitante.
          </p>
          <div className="mt-7 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="cnpj"
                className="block text-sm font-medium leading-6 text-gray-900 font-inter"
              >
                CNPJ
              </label>
              <div className="mt-2 relative">
                <input
                  onChange={formik.handleChange}
                  value={formik.values.cnpj}
                  onBlur={formik.handleBlur}
                  type="text"
                  name="cnpj"
                  id="cnpj"
                  autoComplete="cnpj"
                  className={`${
                    formik.touched.cnpj && formik.errors.cnpj
                      ? "focus:ring-red-500 ring-red-500"
                      : "focus:ring-indigo-600"
                  } text-sm py-2 px-3 rounded-md shadow-sm ring-1 font-inter ring-gray-300 ring-inset focus:ring-2 focus:ring-inset focus:outline-none w-full`}
                />
                <p className="absolute -top-2 right-6 text-xs text-red-500 bg-white px-2 font-inter">
                  {formik.errors.cnpj && formik.touched.cnpj
                    ? formik.errors.cnpj
                    : ""}
                </p>
                <p className="text-xs text-end text-gray-600 font-inter">
                  Informe apenas os números do cnpj!
                </p>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="nome"
                className="block text-sm font-medium leading-6 text-gray-900 font-inter"
              >
                Nome fantasia
              </label>
              <div className="mt-2 relative">
                <input
                  onChange={formik.handleChange}
                  value={formik.values.nome}
                  onBlur={formik.handleBlur}
                  type="text"
                  name="nome"
                  id="nome"
                  autoComplete="nome-fantasia"
                  className={`${
                    formik.touched.nome && formik.errors.nome
                      ? "focus:ring-red-500 ring-red-500"
                      : "focus:ring-indigo-600"
                  } text-sm py-2 px-3 rounded-md shadow-sm ring-1 font-inter ring-gray-300 ring-inset focus:ring-2 focus:ring-inset focus:outline-none w-full`}
                />
                <p className="absolute -top-2 right-6 text-xs text-red-500 bg-white px-2 font-inter">
                  {formik.errors.nome && formik.touched.nome
                    ? formik.errors.nome
                    : ""}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900 mt-7 font-inter">
            Localidade
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600 font-inter">
            Informe as informações de localização do solicitante.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="cnpj"
                className="block text-sm font-medium leading-6 text-gray-900 font-inter"
              >
                CEP
              </label>
              <div className="relative mt-2">
                <input
                  onKeyDown={handleBuscaCepEnter}
                  onChange={formik.handleChange}
                  value={formik.values.cep}
                  onBlur={formik.handleBlur}
                  type="text"
                  name="cep"
                  id="cep"
                  autoComplete="cep"
                  className={`${
                    formik.touched.cep && formik.errors.cep
                      ? "focus:ring-red-500 ring-red-500"
                      : "focus:ring-indigo-600"
                  } text-sm py-2 px-3 rounded-md shadow-sm font-inter ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-inset focus:outline-none w-full`}
                />
                <p className="absolute -top-2 right-6 text-xs text-red-500 bg-white px-2 font-inter">
                  {formik.errors.cep && formik.touched.cep
                    ? formik.errors.cep
                    : ""}
                </p>
                <button
                  type="button"
                  className="absolute top-1 right-2 mt-0.5 text-gray-700 font-inter"
                  onClick={handleBuscaCep}
                >
                  <MagnifyingGlassIcon className="h-6 w-6" />
                </button>
                <p className="text-xs text-end text-gray-600 font-inter">
                  Informe apenas os números do cep!
                </p>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="endereco"
                className="block text-sm font-medium leading-6 text-gray-900 font-inter"
              >
                Endereço
              </label>
              <div className="mt-2 relative">
                <input
                  onChange={formik.handleChange}
                  value={formik.values.endereco}
                  onBlur={formik.handleBlur}
                  type="text"
                  name="endereco"
                  id="endereco"
                  autoComplete="endereco"
                  className={`${
                    formik.touched.endereco && formik.errors.endereco
                      ? "focus:ring-red-500 ring-red-500"
                      : "focus:ring-indigo-600"
                  } text-sm py-2 px-3 rounded-md font-inter shadow-sm ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-inset focus:outline-none w-full`}
                />
                <p className="absolute -top-2 right-6 text-xs text-red-500 bg-white px-2 font-inter">
                  {formik.errors.endereco && formik.touched.endereco
                    ? formik.errors.endereco
                    : ""}
                </p>
              </div>
            </div>

            <div className="sm:col-span-1">
              <label
                htmlFor="numero"
                className="block font-inter text-sm font-medium leading-6 text-gray-900"
              >
                Número
              </label>
              <div className="mt-2 relative">
                <input
                  onChange={formik.handleChange}
                  value={formik.values.numero}
                  onBlur={formik.handleBlur}
                  type="text"
                  name="numero"
                  id="numero"
                  autoComplete="numero"
                  className={`${
                    formik.touched.numero && formik.errors.numero
                      ? "focus:ring-red-500 ring-red-500"
                      : "focus:ring-indigo-600"
                  } text-sm py-2 px-3 font-inter rounded-md shadow-sm ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-inset focus:outline-none w-full`}
                />
                <p className="absolute -top-2 right-6 text-xs text-red-500 bg-white px-2 font-inter">
                  {formik.errors.numero && formik.touched.numero
                    ? formik.errors.numero
                    : ""}
                </p>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="cidade"
                className="block text-sm font-medium leading-6 text-gray-900 font-inter"
              >
                Cidade
              </label>
              <div className="mt-2 relative">
                <input
                  onChange={formik.handleChange}
                  value={formik.values.cidade}
                  onBlur={formik.handleBlur}
                  type="text"
                  name="cidade"
                  id="cidade"
                  autoComplete="cidade"
                  className={`${
                    formik.touched.cidade && formik.errors.cidade
                      ? "focus:ring-red-500 ring-red-500"
                      : "focus:ring-indigo-600"
                  } text-sm py-2 px-3 rounded-md font-inter shadow-sm ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-inset focus:outline-none w-full`}
                />
                <p className="absolute -top-2 right-6 text-xs text-red-500 bg-white px-2 font-inter">
                  {formik.errors.cidade && formik.touched.cidade
                    ? formik.errors.cidade
                    : ''}
                </p>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="estado"
                className="block text-sm font-medium leading-6 text-gray-900 font-inter"
              >
                UF
              </label>
              <div className="mt-2 relative">
                <input
                  onChange={formik.handleChange}
                  value={formik.values.estado}
                  onBlur={formik.handleBlur}
                  type="text"
                  name="estado"
                  id="estado"
                  autoComplete="estado"
                  className={`${
                    formik.touched.estado && formik.errors.estado
                      ? "focus:ring-red-500 ring-red-500"
                      : "focus:ring-indigo-600"
                  } text-sm py-2 px-3 rounded-md font-inter shadow-sm ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-inset focus:outline-none w-full`}
                />
                <p className="absolute -top-2 right-6 text-xs text-red-500 bg-white px-2 font-inter">
                  {formik.errors.estado && formik.touched.estado
                    ? formik.errors.estado
                    : ""}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900 mt-7 font-inter">
            Contato
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600 font-inter">
            Informe as informações de contato com o solicitante.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="responsavel"
                className="block text-sm font-medium leading-6 text-gray-900 font-inter"
              >
                Responsável
              </label>
              <div className="mt-2 relative">
                <input
                  onChange={formik.handleChange}
                  value={formik.values.responsavel}
                  onBlur={formik.handleBlur}
                  type="responsavel"
                  name="responsavel"
                  id="responsavel"
                  autoComplete="responsavel"
                  className={`${
                    formik.touched.responsavel && formik.errors.responsavel
                      ? "focus:ring-red-500 ring-red-500"
                      : "focus:ring-indigo-600"
                  } text-sm py-2 px-3 rounded-md font-inter shadow-sm ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-inset focus:outline-none w-full`}
                />
                <p className="absolute -top-2 right-6 text-xs text-red-500 bg-white px-2 font-inter">
                  {formik.errors.responsavel && formik.touched.responsavel
                    ? formik.errors.responsavel
                    : ""}
                </p>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 font-inter"
              >
                Email
              </label>
              <div className="mt-2 relative">
                <input
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className={`${
                    formik.touched.email && formik.errors.email
                      ? "focus:ring-red-500 ring-red-500"
                      : "focus:ring-indigo-600"
                  } text-sm py-2 px-3 font-inter rounded-md shadow-sm ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-inset focus:outline-none w-full`}
                />
                <p className="absolute -top-2 right-6 text-xs text-red-500 bg-white px-2 font-inter">
                  {formik.errors.email && formik.touched.email
                    ? formik.errors.email
                    : ""}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="telefone"
                className="block text-sm font-medium leading-6 text-gray-900 font-inter"
              >
                Telefone
              </label>
              <div className="mt-2 relative">
                <input
                  onChange={formik.handleChange}
                  value={formik.values.telefone}
                  onBlur={formik.handleBlur}
                  type="telefone"
                  name="telefone"
                  id="telefone"
                  autoComplete="telefone"
                  className={`${
                    formik.touched.telefone && formik.errors.telefone
                      ? "focus:ring-red-500 ring-red-500"
                      : "focus:ring-indigo-600"
                  } text-sm py-2 px-3 rounded-md font-inter shadow-sm ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-inset focus:outline-none w-full`}
                />
                <p className="absolute -top-2 right-6 text-xs text-red-500 bg-white px-2 font-inter">
                  {formik.errors.telefone && formik.touched.telefone
                    ? formik.errors.telefone
                    : ""}
                </p>
                <p className="text-xs text-end text-gray-600 font-inter">
                  Informe apenas os números do telefone!
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
                          Solicitante cadastrado
                        </Dialog.Title>
                        <div>
                          <p className="text-sm text-gray-500 font-inter">
                            O solicitante {formik.values.nome} foi cadastrado
                            com sucesso!
                          </p>
                        </div>
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

export default CadastrarSolicitante;
