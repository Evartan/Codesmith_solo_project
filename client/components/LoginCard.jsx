import React from "react";
import { useState } from "react";
import EditCard from "./EditCard.jsx";
import DeleteModal from "./DeleteModal.jsx";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const LoginCard = (props) => {

  // state variable keeping track of if card is being updated or not
  const [isBeingUpdated, setisBeingUpdated] = useState(false);

   const handleClick = () => {
    setisBeingUpdated(true);
   }

  if (!isBeingUpdated) {
    return (
      <Box m={1} p={0}>
        <Card elevation={3}>
          <CardContent>
            <Stack
              direction="row"
              spacing={7}
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="caption">URL: {props.url}</Typography>
              <Typography variant="caption">
                Username: {props.username}
              </Typography>
              <Typography variant="caption">
                Password: {props.password}
              </Typography>
            </Stack>
          </CardContent>
          <CardActions p={8}>
            <Stack direction="row" spacing={3}>
              <Button variant="outlined" onClick={handleClick}>
                Edit
              </Button>
              <DeleteModal id={props.id} setUpdated={props.setUpdated} />
            </Stack>
          </CardActions>
        </Card>
      </Box>
    );
  }
  return (
    <EditCard
      id={props.id}
      url={props.url}
      username={props.username}
      password={props.password}
      setUpdated={props.setUpdated}
      setisBeingUpdated={setisBeingUpdated}
    />
  );

}

export default LoginCard;