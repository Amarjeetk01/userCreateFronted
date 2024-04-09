import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, Navigate ,Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';
import BackdropComponent from "../components/Backdrop";
import { authError, authStatus, isAuthLoading, isAuthenticated, registerUserAsync } from "./authSlice";
const Signup = () => {
  const dispatch =useDispatch()
  const navigate=useNavigate()
  const loading =useSelector(isAuthLoading)
  const error=useSelector(authError);
  const status = useSelector(authStatus);
  const isAuth = useSelector(isAuthenticated);
  const [showToast,setToast]=useState(false)

  const handleSubmit =async (event) => {
    event.preventDefault();
    setToast(false)
    const data = new FormData(event.currentTarget);
    const userData = {
      first_name: data.get("firstName"),
      last_name: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    };
    await dispatch(registerUserAsync(userData))
    setToast(true)
  };

  useEffect(()=>{
    if(!loading && error && showToast){
      toast.error(error)
    }else if (isAuth && status && showToast) {
      toast.success(status);
      navigate(`/`);
      window.location.reload();
    }

  },[error,loading,showToast])
  return (
    <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0 ">
    {isAuth && <Navigate to="/" replace={true}></Navigate>}
      <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
        <div
          className="md:block lg:w-1/2 bg-contain bg-no-repeat bg-center bg-blue-700"
          style={{
            backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <div className=" flex flex-col items-center">
            <div className="text-center">
              <p className="text-xl text-gray-600 text-center">
                Hey enter your details to{" "}
                <span className="text-blue-900 font-bold block">Create your account</span>
              </p>
            </div>
            <div className="w-full flex-1 mt-4">
              <form className="w-full" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="firstName"
                      name="firstName"
                      label="First Name"
                      size="small"
                      fullWidth
                      autoComplete="given-name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="lastName"
                      name="lastName"
                      label="Last Name"
                      size="small"
                      fullWidth
                      autoComplete="given-name"
                    />
                  </Grid>
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

                  <Grid item xs={12}>
                    <Button
                      className="bg-[#9155FD] w-full"
                      type="submit"
                      variant="contained"
                    >
                      Register
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
            <p className="mt-6 text-xs text-gray-600 text-center">
              Already have an account?{" "}
              <Link to={`/login`}>
                <span className="text-blue-900 font-semibold">Sign in</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Toaster />
      <BackdropComponent open={loading} />
    </div>
  );
};
export default Signup;
