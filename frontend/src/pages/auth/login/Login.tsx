import React from "react";
import logo from "../../../assets/logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../../features/auth/authSlice.ts";

interface LoginRequest {
  email: string;
  senha: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const formik = useFormik({
    initialValues: {
      email: "",
      senha: "",
    },

    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Email inválido!")
        .required("Campo obrigatório!"),
      senha: yup
        .string()
        .required("Campo obrigatório!")
        .min(8, "Senha deve ter no minímo 8 caractéres!"),
    }),

    onSubmit: async (values: LoginRequest) => {
      try {
        const response = await axios.post(
          "https://uno-production.up.railway.app/auth/login",
          values
        );
        const data = response.data;
        dispatch(login(data));
        navigate(from, { replace: true });
      } catch (error: any) {
        if (error.response.data.error === "Email não cadastrado!") {
          formik.errors.email = error.response.data.error;
        } else {
          formik.errors.senha = error.response.data.error;
        }
      }
    },
  });

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-4/5 sm:w-96">
        <img src={logo} alt="logo" className="h-10 mx-auto" />
        <h3 className="text-center font-inter font-semibold text-xl text-gray-800 my-7">
          Informe suas credenciais
        </h3>
        <form className="relative" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col mb-7">
            <label
              htmlFor="email"
              className="mb-1 font-lato text-sm text-gray-900"
            >
              Email
            </label>
            <div className="relative">
              <input
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                type="email"
                id="email"
                className={`${
                  formik.touched.email && formik.errors.email
                    ? "focus:ring-red-500 ring-red-500"
                    : "focus:ring-indigo-600"
                } text-sm py-2 px-3 rounded-md shadow-sm ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-inset focus:outline-none w-full`}
              />

              <p className="text-xs absolute -top-2 right-6 bg-white px-2 text-red-500">
                {formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : ""}
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="senha"
              className="mb-1 font-lato text-sm text-gray-900"
            >
              Senha
            </label>
            <div className="relative">
              <input
                onChange={formik.handleChange}
                value={formik.values.senha}
                onBlur={formik.handleBlur}
                type="password"
                id="senha"
                className={`${
                  formik.touched.senha && formik.errors.senha
                    ? "focus:ring-red-500 ring-red-500"
                    : "focus:ring-indigo-600"
                } text-sm py-2 px-3 rounded-md shadow-sm ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-inset focus:outline-none w-full`}
              />

              <p className="absolute -top-2 right-6 text-xs text-red-500 px-2 bg-white">
                {formik.touched.senha && formik.errors.senha
                  ? formik.errors.senha
                  : ""}
              </p>
            </div>
          </div>
          <Link
            className="text-xs text-indigo-600 hover:text-indigo-800 absolute right-0"
            to="/esqueceu-senha"
          >
            Esqueceu a senha?
          </Link>

          <button
            type="submit"
            className="bg-indigo-600 w-full py-1.5 rounded-md text-white font-lato font-medium hover:bg-indigo-700 mt-14"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;