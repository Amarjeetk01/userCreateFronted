import React, { useEffect } from "react";
import {
  Box,
  Container,
  Divider,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import UserCard from "../../components/UserCard";
import { fetchTeamByIdAsync, getTeam,  getTeamStatus, totalTeamPages } from "./teamSlice";
import { getAuth, } from "../../auth/authSlice";
import BackdropComponent from "../../components/Backdrop";

const TeamMembers = () => {
  const dispatch = useDispatch();
  const totalPages = useSelector(totalTeamPages);
  const team = useSelector(getTeam);
  const auth = useSelector(getAuth);
  const teamStatus = useSelector(getTeamStatus);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        let id = auth.id;
        await dispatch(fetchTeamByIdAsync(id));
      } catch (error) {
        console.error("Error fetching team:", error);
      }
    };
    if(auth){
      fetchData();
    }
   
  }, [dispatch]);


  return (
    <>
      <Container className="flex items-center justify-center mt-4 p-4">
        <Typography variant="h3" gutterBottom component="div">
          Our Teams
        </Typography>
        <Divider />
        <Container>
          <Box
            sx={{ flexGrow: 1 }}
            className="grid grid-cols-2 px-3 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4"
          >
            {team && team.members.length > 0 ? (
              team.members.map((user) => <UserCard key={user.id} user={user} />)
            ) : (
              <Typography>Team is not created yet!</Typography>
            )}
          </Box>
          <Stack spacing={2} className="mt-4 mb-5 float-end">
            <Pagination count={totalPages} variant="outlined" shape="rounded" />
          </Stack>
        </Container>
        <BackdropComponent open={teamStatus==="loading"} />
        <Toaster/>
      </Container>
    </>
  );
};

export default TeamMembers;
