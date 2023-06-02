import React from "react";
import logo from "../../../assets/logo.svg";
import { RxArrowLeft } from "react-icons/rx";
import { Link } from "react-router-dom";

const esqueceuSenha: React.FC = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-4/5 sm:w-96">
        <Link
          to="/login"
          className="text-indigo-600 hover:text-indigo-800 flex items-center gap-2 mb-7"
        >
          <RxArrowLeft size={15} />
          <p className="text-xs font-lato">Voltar ao login</p>
        </Link>
        <img src={logo} alt="logo" className="h-10 mx-auto" />
        <h3 className="font-lato text-2xl text-gray-800 text-center my-7 font-black">
          Esqueceu senha?
        </h3>
        <p className="text-grey-700 font-lato text-sm text-center mb-7">
          Informe seu email abaixo e enviaremos as instruções de recuperação
          pelo email!
        </p>

        <form>
          <div className="mb-7">
            <label
              htmlFor="email"
              className="text-gray-900 text-sm font-lato mb-1"
            >
              Email
            </label>
            <input
              type="email"
              className="text-sm py-2 px-3 rounded-md shadow-sm ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-inset focus:outline-none w-full focus:ring-indigo-600"
            />
          </div>

          <button
            className="bg-indigo-600 w-full py-1.5 rounded-md text-white font-lato font-medium hover:bg-indigo-700"
            type="submit"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default esqueceuSenha;
