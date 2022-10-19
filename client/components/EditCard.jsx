import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

const EditCard = (props) => {
  const [url, setUrl] = useState(props.url);
  const [username, setUsername] = useState(props.username);
  const [password, setPassword] = useState(props.password);

  let handleSubmit = async (e) => {
    e.preventDefault();

    // grab id from props and make patch request
    try {
      let response = await fetch(`/api/${props.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          url: url,
          username: username,
          password: password,
        }),
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      console.log(e);
    } finally {
      props.setisBeingUpdated(false);
      props.setUpdated(true);
    }
  };

  let handleClick = () => {
    props.setisBeingUpdated(false);
  };

  return (
    <Box m={1} p={0}>
      <Card elevation={5}>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Stack
              spacing={2}
              alignItems="center"
              direction="row"
              justifyContent="center"
            >
              <TextField
                type="url"
                id="outlined-basic"
                label="URL"
                variant="outlined"
                size="small"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                size="small"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Stack>
          </CardContent>
          <CardActions>
            <Button type="submit" variant="outlined">
              Save
            </Button>
            <Button onClick={handleClick} variant="outlined">
              Cancel
            </Button>
          </CardActions>
        </form>
      </Card>
    </Box>
  );
};

export default EditCard;
