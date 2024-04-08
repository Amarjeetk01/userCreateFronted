import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserByIdAsync,
  fetchUserByIdAsync,
  selectedUser,
  usersStatus,
} from "../userSlice";
import { useParams, useNavigate } from "react-router-dom";
import BackdropComponent from "../../../components/Backdrop";
import ProfileImage from "../../../assets/profile-img.jpeg";
import {
  addToTeamAsync,
  getTeamAddedMessage,
  getTeamError,
  getTeamStatus,
} from "../../teams/teamSlice";
import AlertDialog from "../../../components/AlertDialog";
import EditIcon from "@mui/icons-material/Edit";
import { getAuth } from "../../../auth/authSlice";

const UserDetails = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const navigate = useNavigate();

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const auth = useSelector(getAuth);
  const user = useSelector(selectedUser);
  const status = useSelector(usersStatus);
  const teamStatus = useSelector(getTeamStatus);
  const teamErrorMessege = useSelector(getTeamError);
  const teamAddedMessage = useSelector(getTeamAddedMessage);
  const [showToast, setShowToast] = useState(false);

  const handleAddToTeam = async () => {
    try {
      if (!auth) {
        toast.error("UnAuthorized.");
        navigate("/login");
      } else {
        await dispatch(addToTeamAsync({ userId: param.id }));
        setShowToast(true);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleOpenAlert = () => {
    setIsAlertOpen((prev) => !prev);
  };

  const handleDelete = async () => {
    let id = param.id;
    await dispatch(deleteUserByIdAsync(id));
    navigate(`/`);
  };

  const handleEdit = () => {
    navigate(`/action?id=${param.id}`);
  };

  useEffect(() => {
    if (showToast && teamStatus === "idle") {
      if (teamErrorMessege) {
        toast.error(teamErrorMessege);
      } else if (teamAddedMessage) {
        toast.success("Successfully added to team");
      }
    }
  }, [teamStatus, teamErrorMessege, teamAddedMessage, showToast]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUserByIdAsync(param.id));
    };
    fetchData();
  }, [param.id]);

  return (
    <Container className="pt-5 p-6" maxWidth="sm">
      {user && (
        <Card
          sx={{ display: "flex" }}
          className="m-4 p-5 max-md:flex-wrap gap-2 justify-center items-center relative"
        >
          <EditIcon
            className=" absolute right-1 mb-1 top-0 cursor-pointer"
            onClick={handleOpenAlert}
          />
          <CardMedia
            component="img"
            sx={{ width: 200, minWidth: 200, maxWidth: 200 }}
            image={user?.avatar?.split("?size")[0] || ProfileImage}
            alt={`${user.first_name} ${user.last_name}`}
            className="shadow-md"
          />
          <Box
            sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
            className="justify-between"
          >
            <Box className="m-4">
              <Typography variant="h4" gutterBottom>
                {`${user.first_name} ${user.last_name}`}
              </Typography>
              <div className="flex gap-2">
                <Typography variant="body1" color="textSecondary">
                  Gender:
                </Typography>
                <Typography variant="body1">{user.gender}</Typography>
              </div>
              <div className="flex gap-2">
                <Typography variant="body1" color="textSecondary">
                  Email:
                </Typography>
                <Typography variant="body1">{user.email}</Typography>
              </div>
              <div className="flex gap-2">
                <Typography variant="body1" color="textSecondary">
                  Domain:
                </Typography>
                <Typography variant="body1">{user.domain}</Typography>
              </div>
            </Box>
            <Box className="ml-4 mt-auto">
              <Button
                variant="contained"
                color="primary"
                disabled={!user.available}
                onClick={handleAddToTeam}
                className="w-full"
              >
                {user.available ? "Add to Team" : "Not Available"}
              </Button>
            </Box>
          </Box>
        </Card>
      )}
      <AlertDialog
        handleOpenAlert={handleOpenAlert}
        isAlertOpen={isAlertOpen}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
      <BackdropComponent
        open={status === "loading" || teamStatus === "loading"}
      />
    </Container>
  );
};

export default UserDetails;
