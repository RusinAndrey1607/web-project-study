import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../store/auth.slice";
import { apiFetch } from "../app/api";

const WithAuth = ({ element }) => {
  const [loading, setLoading] = useState(true);

  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await apiFetch("/auth/check",{
            method: 'GET',
            credentials:"include"
        });
        console.log(response);
        dispatch(login(response));
      } catch (error) {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [dispatch, navigate]);
  if (loading) {
    return <div>Loading...</div>; 
  }
  return isAuth ? element : <Navigate to="/login" />;
};

export default WithAuth;
