import React from "react";
import { useState, useEffect, useCallback } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import LoginCard from "./LoginCard.jsx";

const LoginsContainer = (props) => {

    // logins array will be kept in state
    const [logins, setLogins] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [startingIndex, setStartingIndex] = useState(0);
    const [partialLogins, setPartialLogins] = useState([]);

    const fetchLoginsHandler = useCallback(async () => {
      console.log('fetch logins handler executed')
      setIsLoading(true);
      setError(null);
      props.setUpdated(false)

      try {
        const response = await fetch("/api/", {
            method: "GET",
            headers: {
            Accept: "application/json",
            },
        });

        if (!response.ok) {
         throw new Error(`Error! status: ${response.status}`);
       }

        const json = await response.json();

        setLogins(json.reverse());

        setPartialLogins(json.slice(startingIndex, startingIndex + 5))
     
      } catch (error) {
        setError(error.message);
      } 
      setIsLoading(false);
      // put state here
    }, [props.updated, startingIndex]);

    console.log('logins state -> ', partialLogins)

    // use effect to grab logins array
    useEffect(() => {
        console.log('useEffect runs')
        fetchLoginsHandler();
    }, [fetchLoginsHandler]);

    const handleIncrement = () => {
      setStartingIndex(prevIndex => {
        return prevIndex + 5 < logins.length ? prevIndex + 5 : prevIndex;
      })
    }

    const handleDecrement = () => {
      setStartingIndex((prevIndex) => {
        return prevIndex - 5 >= 0 ? prevIndex - 5 : prevIndex;
      });
    };

    return (
      <div>
        {isLoading && <h2>Loading...</h2>}
        {partialLogins.map((login) => (
          <LoginCard
            url={login.url}
            username={login.username}
            password={login.password}
            key={login._id}
            id={login._id}
            setUpdated={props.setUpdated}
          />
        ))}
        <span className="loginCard">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDecrement}
          >
            Show Previous
          </Button>
          <Typography variant="subtitle1">
            Showing {logins.length ? startingIndex + 1 : startingIndex}-
            {startingIndex + 5 <= logins.length
              ? startingIndex + 5
              : logins.length}{" "}
            of {logins.length}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleIncrement}
          >
            Show Next
          </Button>
        </span>
      </div>
    );
}


export default LoginsContainer;