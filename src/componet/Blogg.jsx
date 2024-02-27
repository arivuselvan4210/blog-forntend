import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RecipeReviewCard({
  titale,
  img,
  desc,
  username,
  isuser,
  id,
}) {
  const handeldelete = async () => {
    await axios
      .delete(`https://blog-backend-1ou4.vercel.app/blog/${id}`)

      .catch((err) => console.log(err));
  };

  return (
    <Card
      sx={
        {
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
        }
      }
    >
      <Card
        sx={{
          maxWidth: 500,
          margin: "20px auto",
        }}
      >
        {isuser && (
          <Box display={"flex"} justifyContent={"flex-end"} gap={1}>
            <Button>
              <DeleteIcon onClick={handeldelete} />
            </Button>

            <Button LinkComponent={Link} to={`/edit/${id}`}>
              <EditIcon />
            </Button>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {username ? username.charAt(0) : ""}
            </Avatar>
          }
          action={<IconButton aria-label="settings"></IconButton>}
          title={titale}
        />
        <CardMedia
          component="img"
          height="194"
          image={img}
          sx={{ padding: 1, borderRadius: 4 }}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {username}
            {" : "}
            {desc}
          </Typography>
        </CardContent>
      </Card>
    </Card>
  );
}
