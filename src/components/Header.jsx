import React, { useEffect, useState } from "react";
import { Home, Login, Pets, LibraryBooks, Logout, PeopleAlt } from "@mui/icons-material";
import GroupIcon from "@mui/icons-material/Group";
import {
  AppBar,
  Avatar,
  Box,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
  ClickAwayListener,
  Divider,
  TextField,
  Stack,
  Autocomplete,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import ProfileImage from "../assets/profile-img.jpeg";
import { isAuthenticated, logoutUserAsync } from "../auth/authSlice";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const users = useSelector(getUser);
  const isAuth = useSelector(isAuthenticated);
  const [open, setOpen] = useState(false);

  const handleSearch = (e, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("search", value);
    const query = searchParams.toString();
    navigate(`/?${query}`);
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    await dispatch(logoutUserAsync());
    setOpen((prev) => !prev);
  };

  return (
    <>
      <AppBar position="sticky">
        <StyledToolbar>
          <Link to={"/"}>
            <Typography
              variant="h6"
              // sx={{ display: { xs: "none", sm: "block" } }}
              className="cursor-pointer"
            >
              Logo
            </Typography>
          </Link>
          <Pets
            sx={{ display: { xs: "block", sm: "none" } }}
            onClick={handleClickOpen}
          />
          <Stack
            spacing={2}
            sx={{
              width: 300,
              height: 40,
              display: { xs: "none", sm: "block" },
            }}
          >
            {" "}
            {/* Adjust height as needed */}
            <Autocomplete
              className="bg-white rounded-md"
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={users.map((option, index) => option.first_name)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="search here..."
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                    sx: { py: 1 }, 
                  }}
                  onKeyDown={(e) => handleSearch(e, params.inputProps.value)}
                  sx={{
                    height: "100%",
                    "& .MuiInputBase-root": { height: "100%" },
                  }} // Adjust height of the input field
                />
              )}
            />
          </Stack>

          <Icons>
            <Link to={`/team`}>
              <GroupIcon />
            </Link>
            <Avatar
              className="cursor-pointer"
              sx={{ width: 30, height: 30 }}
              src={ProfileImage}
              onClick={(e) => setAnchorEl(e.currentTarget)}
            />
          </Icons>
        </StyledToolbar>

        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {isAuth ? (
            <div>
              <Link to={`/action`}>
                <MenuItem className="gap-2">
                  <LibraryBooks /> Action
                </MenuItem>
              </Link>
              <MenuItem className="gap-2" onClick={handleLogout}>
                <Logout /> Logout
              </MenuItem>
            </div>
          ) : (
            <Link to={`/login`}>
              <MenuItem>
                <Login /> Login
              </MenuItem>
            </Link>
          )}
        </Menu>
      </AppBar>
      {/* <ClickAwayListener onClickAway={()=>setOpen(false)}> */}
        <Box
          className={`h-auto w-screen m-2 p-2 z-50 bg-white fixed ${
            !open ? "hidden" : ""
          }`}
        >
        <Stack spacing={2}>
                <Autocomplete
                  className="bg-white rounded-md"
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  options={users.map((option, index) => option.first_name)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="search here..."
                      InputProps={{
                        ...params.InputProps,
                        type: "search",
                      }}
                      onKeyDown={(e) =>
                        handleSearch(e, params.inputProps.value)
                      }
                      
                    />
                  )}
                />
              </Stack>
              <Divider />
              <Link to={`/`}>
                <Box
                  component="section"
                  sx={{ p: 2,}}
                  onClick={handleClickOpen}
                >
                  <Home /> Home
                </Box>
              </Link>
              <Divider />
              
          {isAuth ? (
            <div>
            <Link to={`/team`}>
                <Box
                  component="section"
                  sx={{ p: 2,}}
                  onClick={handleClickOpen}
                >
                  <PeopleAlt /> Team
                </Box>
              </Link>
              <Divider />
              <Link to={`/action`}>
                <Box
                  component="section"
                  sx={{ p: 2,  }}
                  onClick={handleClickOpen}
                >
                  <LibraryBooks /> Action
                </Box>
              </Link>
              <Divider />
              <Box
                component="section"
                sx={{ p: 2, border: "1px solid grey" }}
                onClick={handleLogout}
              >
                <Logout /> Logout
              </Box>
            </div>
          ) : (
            <Link to={`/login`}>
            <Box
                  component="section"
                  sx={{ p: 2,  }}
                  onClick={handleClickOpen}
                >
                  <Login /> Login
                </Box>
            </Link>
          )}
        </Box>
      {/* </ClickAwayListener> */}
    </>
  );
};

export default Header;
