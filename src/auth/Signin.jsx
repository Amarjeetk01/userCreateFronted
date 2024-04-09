import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import {
  authError,
  authStatus,
  isAuthLoading,
  isAuthenticated,
  loginUserAsync,
} from "./authSlice";
import toast, { Toaster } from "react-hot-toast";
import BackdropComponent from "../components/Backdrop";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(isAuthLoading);
  const status = useSelector(authStatus);
  const error = useSelector(authError);
  const isAuth = useSelector(isAuthenticated);
  const [showToast, setToast] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setToast(false);
    const data = new FormData(event.currentTarget);

    const authData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    await dispatch(loginUserAsync(authData));
    setToast(true);
  };
  useEffect(() => {
    if (showToast && !loading && !isAuth && error) {
      toast.error(error);
    }else if (isAuth && status && showToast) {
      toast.success(status);
      navigate(`/`);
      
    }
  }, [error, loading, status, isAuth, showToast]);
  return (
    <div className="flex items-center justify-center h-screen w-full sm:px-0">
      {isAuth && <Navigate to="/" replace={true}></Navigate>}
      <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
        <div
          className="hidden md:block lg:w-1/2 bg-contain bg-no-repeat bg-center bg-blue-700"
          style={{
            backgroundImage: `url(https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg)`,
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <p className="text-xl text-gray-600 text-center">Welcome back!</p>
          <div className="mt-4">
            <form className="w-full" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="email"
                    name="email"
                    label="Email"
                    size="small"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="password"
                    name="password"
                    label="Password"
                    size="small"
                    fullWidth
                    type="password"
                  />
                </Grid>
                <a
                  href="#"
                  className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
                >
                  Forget Password?
                </a>
                {/* </div> */}
                {/* <div className="mt-8"> */}
                <Grid item xs={12}>
                  <Button
                    className="bg-[#9155FD] w-full"
                    type="submit"
                    variant="contained"
                    //   size="medium"
                    //   sx={{ padding: ".8rem 0" }}
                  >
                    Sign in
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>

          <div className="mt-4 flex items-center w-full text-center">
            <Link
              to={`/register`}
              className="text-xs text-gray-500 capitalize text-center w-full"
            >
              Don't have any account yet?
              <span className="text-blue-700"> Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
      <Toaster />
      <BackdropComponent open={loading} />
    </div>
  );
};
export default Signin;
