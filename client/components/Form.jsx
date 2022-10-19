import React from "react";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


const Form = (props) => {

    const [url, setUrl] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const urlInput = document.getElementById("UrlInput");
    // write a validation function which handle submit will call
    // let checkValidity = () => {
    //   let isUrlValid = url.checkValidity(UrlInput);
    //   return isUrlValid;
    // }

    let handleSubmit = async (e) => {
      e.preventDefault();
      // console.log(urlInput);
      // console.log("This is before check valid", urlInput.checkValidity());

      // validate input
      if (username === '' || password === '' || url === '') {
        setMessage('Please fill out all fields!')
        setTimeout(() => {
          setMessage("");
        }, "4000");
        return;
      }
      try {
        
        let res = await fetch("/api/", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            url: url,
            username: username,
            password: password,
          }),
        });

        let resJson = await res.json();

        if (res.status === 200) {
          setUrl("");
          setUsername("");
          setPassword("");
          setMessage("Login created successfully");
        } else {
          setMessage("Some error occured");
        }

        setTimeout(() => {
          setMessage("");
        }, "6000");
      } catch (e) {
        console.log(e);
      } finally {
        props.setUpdated(true);
      }
    };

    // return jsx element

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Stack
            spacing={2}
            alignItems="center"
            direction="row"
            justifyContent="center"
          >
            <TextField
              id="outlined-basic"
              label="URL"
              variant="outlined"
              size="small"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Uername"
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
            <Button type="submit" variant="outlined">
              Create
            </Button>
            <div>{message ? <p>{message}</p> : null}</div>
          </Stack>
        </form>
      </div>
    );
};

export default Form;