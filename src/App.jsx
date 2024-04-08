import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import UserLists from "./features/users/components/UserList";
import UserDetails from "./features/users/components/UserDetails";
import TeamMembers from "./features/teams/TeamMembers";
import Action from "./components/Action";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchAuthAsync, isAuthLoading } from "./auth/authSlice";
import Layout from "./components/Layout";
import BackdropComponent from "./components/Backdrop";
import Protected from "./components/Protected";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector(isAuthLoading);
  useEffect(() => {
    const fetchAuth = async () => {
      await dispatch(fetchAuthAsync());
    };
    fetchAuth();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><UserLists /></Layout>} />
          <Route path="/user/:id" element={<Layout><UserDetails /></Layout>} />
          <Route path="/team" element={<Protected><Layout><TeamMembers /></Layout></Protected>} />
          <Route path="/action" element={<Protected><Layout><Action /></Layout></Protected>} />
          <Route path="/login" element={<Signin />} />
          <Route path="*" element={<Signin />} />
          <Route path="/register" element={<Signup />} />
        </Routes>
        <BackdropComponent open={loading} />
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
