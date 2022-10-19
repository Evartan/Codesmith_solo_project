import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

const Delete = (props) => {

    // right now not doing anything with this error
    const [err, setErr] = useState("");

    const handleClick = async () => {

        // make a fetch request to delete
        try {
          const response = await fetch(`/api/${props.id}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
          }
        } catch (err) {
          setErr(err.message);
        } finally {
          props.setUpdated(true);
        }
    }

    // return element
    return (
      <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={handleClick}>
        Delete
      </Button>
    );

};

export default Delete;