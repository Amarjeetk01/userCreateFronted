import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Divider,
  Grid,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Image } from "cloudinary-react";
import toast, { Toaster } from "react-hot-toast";
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserAsync,
  fetchUserByIdAsync,
  selectedUser,
  updateUserByIdAsync,
  userSliceError,
  usersStatus,
} from "../features/users/userSlice";
import { fetchAuthAsync } from "../auth/authSlice";
const cloudName =  import.meta.env.VITE_REACT_CLOUD_NAME;
const upload_preset =  import.meta.env.VITE_REACT_UPLOAD_PRESET;


const Profile = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const errorMessege = useSelector(userSliceError);
  const user = useSelector(selectedUser);
  const status = useSelector(usersStatus);
  const [info, setInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    avatar: null,
    domain: "",
    available: false,
  });
  const [showToast, setShowToast] = useState(false);

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const userId = searchParams.get("id");

  const handleChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", upload_preset); 

        // Upload image to Cloudinary
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        // setImage(data.secure_url);
        setInfo((prevInfo) => ({
          ...prevInfo,
          avatar: data.secure_url,
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      setShowToast(false)
      const {
        first_name,
        last_name,
        email,
        gender,
        avatar,
        domain,
        available,
      } = info;
      if (userId && user && user.length != 0) {
        let id = userId;
        await dispatch(updateUserByIdAsync({ id, info }));
        setShowToast(true)
      } else {
        await dispatch(
          createUserAsync({
            first_name,
            last_name,
            email,
            gender,
            avatar,
            domain,
            available,
          })
        );
        setShowToast(true)
      }
    } catch (err) {
      console.log(err);
      toast.error("Error:",err.message)
    }
    // setInfo({
    //   first_name: "",
    //   last_name: "",
    //   email: "",
    //   gender: "",
    //   avatar: null,
    //   domain: "",
    //   available: false,
    // });
  };

  const handleInputChange = (event) => {
    const { name, value, checked } = event.target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [name]: name === "available" ? checked : value,
    }));
  };

  useEffect(() => {
    if (showToast && status === "idle" && errorMessege) {
      toast.error(errorMessege.message);
    }
  }, [status, errorMessege,showToast]);

  useEffect(() => {
    const fetchData = async () => {
      let id = userId;
      await dispatch(fetchUserByIdAsync(id));
    };
    if (userId) {
      fetchData();
    }
  }, [userId]);

  useEffect(() => {
    if (userId && user && user.length != 0) {
      setInfo({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        gender: user.gender,
        avatar: user.avatar,
        domain: user.domain,
        available: user.available,
      });
    }
  }, [user && userId]);

  useEffect(() => {
    const fetchAuth = async () => {
      await dispatch(fetchAuthAsync());
      setLoading(false)
    };
    fetchAuth();
  }, []);

  return (
    <>
      <Container maxWidth="md" className="mt-5">
        <Typography variant="h4" gutterBottom component="div">
          {user && user.length != 0 ? "Update User Info" : "Create User"}
        </Typography>
        <Divider />
        <Container maxWidth="sm" className="mt-5 bg-white p-4">
          <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
              <div className="flex items-center justify-center">
                <label htmlFor="image-upload" className="cursor-pointer">
                  <input
                    id="image-upload"
                    type="file"
                    className="hidden"
                    onChange={handleChange}
                  />
                  {info.avatar ? (
                    <Image
                      cloudName={cloudName} 
                      publicId={info.avatar}
                      width="120"
                      height="120"
                      crop="fill"
                      className="rounded-full cursor-pointer"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-gray-200 rounded-full cursor-pointer flex items-center justify-center">
                      Select Image
                    </div>
                  )}
                </label>
              </div>
            </Grid>
            <Grid item xs={6} md={8}>
              <>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="firstName"
                      name="first_name"
                      label="First Name"
                      fullWidth
                      autoComplete="given-name"
                      value={info.first_name}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="lastName"
                      name="last_name"
                      label="Last Name"
                      fullWidth
                      autoComplete="last-name"
                      value={info.last_name}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="email"
                      name="email"
                      label="Email"
                      fullWidth
                      autoComplete="email"
                      value={info.email}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Select
                        id="gender"
                        name="gender"
                        value={info.gender}
                        onChange={handleInputChange}
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          Gender
                        </MenuItem>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="domain"
                      name="domain"
                      label="Domain"
                      fullWidth
                      value={info.domain}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      required
                      control={
                        <Checkbox
                          checked={info.available}
                          onChange={handleInputChange}
                          name="available"
                        />
                      }
                      label="Availability"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      className="bg-[#9155FD] w-full"
                      type="submit"
                      variant="contained"
                      size="large"
                      sx={{ padding: ".8rem 0" }}
                      onClick={handleSubmit}
                    >
                      {user && user.length != 0 ? "Update info" : "Create User"}
                    </Button>
                  </Grid>
                </Grid>
              </>
            </Grid>
          </Grid>
        </Container>
        <Toaster />
      </Container>
    </>
  );
};

export default Profile;
