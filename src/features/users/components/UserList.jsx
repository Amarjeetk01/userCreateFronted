import {
  Grid,
  Box,
  Typography,
  Toolbar,
  Stack,
  Pagination,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Sidebar from "../../../components/SideBar";
import UserCard from "../../../components/UserCard";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  fetchAllUserAsync,
  totalUserPages,
  usersStatus,
  userSliceError,
} from "../userSlice";
import BackdropComponent from "../../../components/Backdrop";

const UserList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const totalPages = useSelector(totalUserPages);
  const users = useSelector(getUser);
  const status = useSelector(usersStatus);
  const error = useSelector(userSliceError);
  const [open, setOpen] = useState(false);

  const handleToggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const search = searchParams.get("search");
  const domain = searchParams.get("domain");
  const gender = searchParams.get("gender");
  const availability = searchParams.get("availability");
  const pageNumber = searchParams.get("page") || 1;

  const handlePaginationChange = (event, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        search: search || [],
        domain: domain || [],
        gender: gender || [],
        availability: availability || [],
        pageNumber: pageNumber,
        pageSize: 20,
      };
      await dispatch(fetchAllUserAsync(data));
    };
    fetchData();
  }, [domain, gender, availability, pageNumber, search]);

  return (
    <>
      <Typography
        position="fixed"
        variant="h4"
        component="div"
        className="z-10 flex items-baseline justify-between border-b w-full pb-6 pt-5 h-20 p-6 bg-white border-gray-200"
      >
        {search && <>Search results for {search}</>}
        {!search && <>All Users</>}
      </Typography>

      <Toolbar />

      <Box className="mt-2 pt-5 lg:px-8 sm:px-2" component="div">
        {!users || users.length === 0 ? (
          <Typography variant="h4" component="div" className="mt-3 relative">
            No results found.
          </Typography>
        ) : (
          <>
            <Box
              sx={{ display: { md: "none", xs: "block" } }}
              className="cursor-pointer "
            >
              <FilterAltIcon
                onClick={handleToggleDrawer}
                className="absolute right-1 cursor-pointer"
              />
            </Box>
            <Grid container spacing={2}>
              <Grid item md={3}>
                <Sidebar handleToggleDrawer={handleToggleDrawer} open={open} />
              </Grid>
              <Grid item md={9} sm={12} xs={12}>
                <Box
                  sx={{ flexGrow: 1 }}
                  className="grid grid-cols-2 px-3 md:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                  {users.map((user, index) => (
                    <UserCard key={user.id} user={user} />
                  ))}
                </Box>

                <Stack spacing={2} className="mt-4 mb-5 float-end">
                  <Pagination
                    count={totalPages}
                    variant="outlined"
                    shape="rounded"
                    onChange={handlePaginationChange}
                  />
                </Stack>
              </Grid>
            </Grid>
          </>
        )}
        <BackdropComponent open={status === "loading"} />
      </Box>
    </>
  );
};

export default UserList;
