import React from "react";
import { useState, useCallback, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import LoginCard from "./LoginCard.jsx";

const SearchPage = () => {
  const [updated, setUpdated] = useState(false);
  const [searchTerms, setSearchTerms] = useState("");
  const [logins, setLogins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    if (searchTerms === "") {
      setMessage("Search field cannot be blank")
      setTimeout(() => {
        setMessage("");
      }, "4000");
      return;
    }
    setIsLoading(true);
    setMessage("");
    try {
      const response = await fetch(`/search/${searchTerms}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      setLogins(result);
    
      if (result.length === 0) {
        setMessage("No results found");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdates = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setUpdated(false);

    try {
      const response = await fetch(`/search/${searchTerms}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      setLogins(result);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [updated]);

  const notInitialRender = useRef(false);

  useEffect(() => {
    if (notInitialRender.current) {
      handleUpdates();
    } else {
      notInitialRender.current = true;
    }
  }, [handleUpdates]);

  return (
    <>
      <div></div>
      <Stack direction="row" spacing={0}>
        <TextField
          fullWidth
          label="Search"
          id="fullWidth"
          onChange={(e) => setSearchTerms(e.target.value)}
        />
        <Button variant="contained" onClick={handleClick}>
          Search
        </Button>
      </Stack>
      {error && <h2>{error}</h2>}
      {isLoading && <h2>Loading...</h2>}
      {message ? <p>{message}</p> : null}
      {logins.map((login) => (
        <LoginCard
          url={login.url}
          username={login.username}
          password={login.password}
          key={login._id}
          id={login._id}
          setUpdated={setUpdated}
        />
      ))}
    </>
  );
};

export default SearchPage;
