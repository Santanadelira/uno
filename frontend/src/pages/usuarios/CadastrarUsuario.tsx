import { Transition, Dialog } from "@headlessui/react";
import {
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { useFormik } from "formik";
import { useState, useRef, Fragment } from "react";
import Navbar from "../../components/navbar/Navbar";
import * as yup from "yup";
import Select from "react-tailwindcss-select";

interface CadastrarUsuarioRequest {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  cargo: string;
}

const cargoOptions = [
  { value: "", label: "Selecione um cargo" },
  { value: "ADMIN", label: "Administrador" },
  { value: "ANALISTA", label: "Analista" },
  { value: "VENDEDOR", label: "Vendedor" },
  { value: "EXPEDICAO", label: "Expedição" },
];

const CadastrarUsuario = () => {
  const [open, setOpen] = useState(false);
  const [cargo, setCargo] = useState(cargoOptions[0]);

  const cancelButtonRef = useRef(null);

  const changeCargo = (value: any) => {
    console.log("value:", value);
    setCargo(value);
    formik.setFieldValue("cargo", value.value);
  };

  const formik = useFormik({
    initialValues: {
      nome: "",
      email: "",
      senha: "",
      confirmarSenha: "",
      cargo: "",
    },

    validationSchema: yup.object().shape({
      nome: yup.string().required("Campo obrigatório!"),
      email: yup
        .string()
        .email("E-mail inválido!")
        .required("Campo obrigatório!"),
      senha: yup.string().required("Campo obrigatório!"),
      confirmarSenha: yup
        .string()
        .required("Campo obrigatório!")
        .oneOf([yup.ref("senha")], "As senhas não coincidem!"),
      cargo: yup.string().required("Campo obrigatório!"),
    }),

    onSubmit: async (values: CadastrarUsuarioRequest) => {
      try {
        await axios.post(
          "https://uno-production.up.railway.app/auth/cadastrar",
          values
        );
        setOpen(true);
        formik.resetForm();
      } catch (error: any) {
        if (error.response.data.error === "Email já cadastrado!") {
          formik.errors.email = error.response.data.error;
        }
      }
    },
  });

  return (
    <div>
      <Navbar />
      <form className="mx-auto w-5/6 my-7" onSubmit={formik.handleSubmit}>
        <div className="space-y-12 ">
          <div className="border-b border-gray-900/10 pb-7">
            <h2 className="text-base font-inter font-semibold leading-7 text-gray-900">
              Cadastrar Usuário
            </h2>
            <p className="font-inter mt-1 text-sm leading-6 text-gray-600">
              Preencha abaixo cuidadosamente as informações do usuário
            </p>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-7 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="nome"
                className="block text-sm font-medium leading-6 text-gray-900 font-inter"
              >
                Nome
              </label>
              <div className="mt-2 relative">
                <input
                  onChange={formik.handleChange}
                  value={formik.values.nome}
                  onBlur={formik.handleBlur}
                  type="text"
                  name="nome"
                  id="nome"
                  autoComplete="nome"
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
                  autoComplete="email-fantasia"
                  className={`${
                    formik.touched.email && formik.errors.email
                      ? "focus:ring-red-500 ring-red-500"
                      : "focus:ring-indigo-600"
                  } text-sm py-2 px-3 rounded-md shadow-sm ring-1 font-inter ring-gray-300 ring-inset focus:ring-2 focus:ring-inset focus:outline-none w-full`}
                />
                <p className="absolute -top-2 right-6 text-xs text-red-500 bg-white px-2 font-inter">
                  {formik.errors.email && formik.touched.email
                    ? formik.errors.email
                    : ""}
                </p>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="cargo"
                className="block text-sm font-medium leading-6 text-gray-900 font-inter"
              >
                Cargo
              </label>
              <div className="relative mt-2">
                <Select
                  onChange={changeCargo}
                  value={cargo}
                  options={cargoOptions}
                  primaryColor="indigo"
                />
                <p className="absolute -top-2 right-6 text-xs text-red-500 bg-white px-2 font-inter">
                  {formik.errors.cargo && formik.touched.cargo
                    ? formik.errors.cargo
                    : ""}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-7 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            

            <div className="sm:col-span-3">
              <label
                htmlFor="senha"
                className="block text-sm font-medium leading-6 text-gray-900 font-inter"
              >
                Senha
              </label>
              <div className="mt-2 relative">
                <input
                  onChange={formik.handleChange}
                  value={formik.values.senha}
                  onBlur={formik.handleBlur}
                  type="password"
                  name="senha"
                  id="senha"
                  autoComplete="senha"
                  className={`${
                    formik.touched.senha && formik.errors.senha
                      ? "focus:ring-red-500 ring-red-500"
                      : "focus:ring-indigo-600"
                  } text-sm py-2 px-3 rounded-md font-inter shadow-sm ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-inset focus:outline-none w-full`}
                />
                <p className="absolute -top-2 right-6 text-xs text-red-500 bg-white px-2 font-inter">
                  {formik.errors.senha && formik.touched.senha
                    ? formik.errors.senha
                    : ""}
                </p>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="confirmarSenha"
                className="block font-inter text-sm font-medium leading-6 text-gray-900"
              >
                Confirmar Senha
              </label>
              <div className="mt-2 relative">
                <input
                  onChange={formik.handleChange}
                  value={formik.values.confirmarSenha}
                  onBlur={formik.handleBlur}
                  type="password"
                  name="confirmarSenha"
                  id="confirmarSenha"
                  autoComplete="confirmarSenha"
                  className={`${
                    formik.touched.confirmarSenha &&
                    formik.errors.confirmarSenha
                      ? "focus:ring-red-500 ring-red-500"
                      : "focus:ring-indigo-600"
                  } text-sm py-2 px-3 font-inter rounded-md shadow-sm ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-inset focus:outline-none w-full`}
                />
                <p className="absolute -top-2 right-6 text-xs text-red-500 bg-white px-2 font-inter">
                  {formik.errors.confirmarSenha && formik.touched.confirmarSenha
                    ? formik.errors.confirmarSenha
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
                          Usuário cadastrado com sucesso
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

export default CadastrarUsuario;
