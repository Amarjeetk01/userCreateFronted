import React, { useEffect, useState } from "react";
import {useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import BackdropComponent from "./Backdrop";
import { fetchAuthAsync, getAuth } from "../auth/authSlice";


const Protected = ({ children }) => {
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
          <div>{children}</div>
        </>
      )}
    </>
  );
};

export default Protected;
