import { useParams } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { Transition, Dialog } from "@headlessui/react";

interface EnsaioState {
    id: string;
    nomeEnsaio: string;
    especificacao: string;
    dataDeAnalise: Date | null;
    statusEnsaio: string;
    resultado: string;
}

const DetalhesEnsaio = () => {
  const { id } = useParams();
  const [ensaio, setEnsaio] = useState<EnsaioState>();
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      resultado: "",
    },
    onSubmit: async (values) => {
        console.log(values)
      const ensaio = await axios.patch(`https://uno-production.up.railway.app/ensaios/resultado/${id}`, 
        values,
      );
      
      setEnsaio(ensaio.data);
      setOpen(false);
    },
  });

  const getEnsaio = async () => {
    const response = await axios.get(
      `https://uno-production.up.railway.app/ensaios/${id}`
    );
    setEnsaio(response.data);
  };

  const inicializarAnalise = async () => {
    const ensaio = await axios.patch(`https://uno-production.up.railway.app/ensaios/inicializar/${id}`, {
      statusEnsaio: "EmAnalise",
    })

    console.log(ensaio.data)
    setEnsaio(ensaio.data)
  }

  useEffect(() => {
    getEnsaio();
  }, []);

  return ensaio ? (
    <div>
      <Navbar />
      <div className="w-5/6 mx-auto mt-7">
        <div className="border-b border-b-gray-900/10 pb-7 flex justify-between">
          <h2 className="text-gray-900 font-semibold leading-7 font-inter">
            Informações do ensaio
          </h2>

          <div className="flex gap-5">
          <button className="py-2 px-2 font-medium font-inter rounded-md bg-indigo-600 text-xs text-white" onClick={inicializarAnalise}>
            Começar análise
          </button>

          <button className="py-2 px-2 font-medium font-inter rounded-md bg-indigo-600 text-xs text-white" onClick={() => setOpen(true)}>Resultado da análise</button>
          </div>
        </div>
        <div>
          <dl className="divide-y divide-gray-900/10">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                ID
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {ensaio?.id && ensaio.id}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Ensaio
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {ensaio?.nomeEnsaio && ensaio.nomeEnsaio}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Especificação
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {ensaio?.especificacao && ensaio.especificacao}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Status
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {ensaio?.statusEnsaio && ensaio.statusEnsaio.replace(/([A-Z])/g, ' $1').trim()}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Data de análise
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {ensaio?.dataDeAnalise
                  ? new Date(
                      ensaio.dataDeAnalise
                    ).toLocaleDateString("pt-BR", {
                      timeZone: "America/Sao_Paulo",
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                  : "Análise não efetuada!"}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Resultado
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {ensaio?.resultado ?
                  ensaio.resultado : "Análise não efetuada!"}
              </dd>
            </div>
          </dl>
        </div>
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
                              Resultado do ensaio
                            </Dialog.Title>

                            <div className="w-full mt-7">
                              <label
                                htmlFor="resultado"
                                className="block text-sm font-medium leading-6 text-gray-900 font-inter"
                              >
                                Resultado
                              </label>
                              <div className="mt-2 relative w-full">
                              <input
                                  onChange={formik.handleChange}
                                  value={formik.values.resultado}
                                  onBlur={formik.handleBlur}
                                  type="text"
                                  name="resultado"
                                  id="resultado"
                                  autoComplete="resultado"
                                  className={`${
                                    formik.touched.resultado &&
                                    formik.errors.resultado
                                      ? "focus:ring-red-500 ring-red-500"
                                      : "focus:ring-indigo-600"
                                  } text-sm py-2 px-3 rounded-md shadow-sm ring-1 font-inter ring-gray-300 ring-inset focus:ring-2 focus:ring-inset focus:outline-none w-full`}
                                />
                                <p className="absolute -top-2 right-6 text-xs text-red-500 bg-white px-2 font-inter">
                                  {formik.errors.resultado &&
                                  formik.touched.resultado
                                    ? formik.errors.resultado
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

export default DetalhesEnsaio;
