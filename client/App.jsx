import React from "react";
import { Route, Link, Routes  } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import SearchPage from "./components/SearchPage.jsx";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const App = () => {

  return (
    <>
      <nav>
        <Box m={2} sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Kenny Loggins Log-in Saver
              </Typography>
              <Link to="/">
                <Button color="inherit">Home</Button>
              </Link>
              <Link to="/search">
                <Button color="inherit">Search</Button>
              </Link>
            </Toolbar>
          </AppBar>
        </Box>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </>
  );
}

export default App;
