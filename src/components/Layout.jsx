import React, { useEffect, useState } from "react";
import Header from "./Header";
import {useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchAuthAsync, getAuth } from "../auth/authSlice";
import BackdropComponent from "./Backdrop";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const auth = useSelector(getAuth);
  const [loading,setLoading]=useState(true)
  useEffect(() => {
    const fetchAuth = async () => {
      await dispatch(fetchAuthAsync());
      setLoading(false)
    };
    fetchAuth();
  }, []);
  if(loading){
    return <BackdropComponent open={loading} />
  }
  return (
    <>
      {!auth ? (
        <Navigate to="/login" replace={true}></Navigate>
      ) : (
        <>
          <Header />
          <div>{children}</div>
        </>
      )}
    </>
  );
};

export default Layout;
