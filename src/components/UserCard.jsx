import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import ProfileImage from "../assets/profile-img.jpeg";

export default function UserCard({ user }) {
  return (
    <Link to={`/user/${user.id}`}>
      <Card
        sx={{}}
        className="max-w-xs rounded overflow-hidden shadow-lg w-full"
      >
        <CardActionArea>
          <CardMedia
            component="img"
            sx={{height: 200}}
            image={user?.avatar?.split("?size")[0] || ProfileImage}
            alt={user.first_name}
          />
          <CardContent>
            <div className="flex flex-nowrap gap-1 text-ellipsis overflow-hidden">
              <Typography variant="h6" gutterBottom component={"div"}>
                {user.first_name}
              </Typography>
              <Typography variant="h6" gutterBottom component={"div"}>
                {user.last_name}
              </Typography>
            </div>

            <p className="truncate ...">Domain: {user.domain}</p>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
