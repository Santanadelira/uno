import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  selectExpiracao,
  selectToken,
} from "../../features/auth/authSlice.ts";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute: React.FC = () => {
  const token = useSelector(selectToken);
  const expiracao = useSelector(selectExpiracao);
  const tempoAtual = new Date().getTime();
  const tempoExpiracao = new Date(expiracao).getTime();
  const location = useLocation();
  const dispatch = useDispatch();

  if (tempoExpiracao > tempoAtual) {
    return token ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  } else {
    dispatch(logout());
  }

  return <Navigate to="/login" state={{from: location}} replace />
};

export default PrivateRoute;