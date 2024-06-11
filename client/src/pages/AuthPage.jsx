import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { apiFetch } from "../app/api";
import { useDispatch } from "react-redux";
import { login } from "../store/auth.slice";

const AuthPage = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleAuth = async (data) => {
    const endpoint = isLogin ? "/auth/login" : "/auth/registration";
    try {
      const userData = await apiFetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log(userData);
      document.cookie = `userData=${JSON.stringify(userData)}; max-age=86400; path=/`;
      dispatch(login(userData));
      navigate('/');
    } catch (error) {
      console.error('Ошибка при аутентификации:', error.message);
    }
  };

  return (
    <AuthForm onSubmit={handleAuth} type={isLogin ? "login" : "register"} />
  );
};

export default AuthPage;
