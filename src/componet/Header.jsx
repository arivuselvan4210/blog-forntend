import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Button,
  Box,
  Toolbar,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { authacton } from "../store/intex";
const Header = () => {
  const patch = useDispatch();
  const [value, setvalue] = useState(0);
  const isloading = useSelector((state) => state.isloaing);
  const logout = () => {
    patch(authacton.logout());
    localStorage.clear();
  };
  useEffect(() => {
    if (localStorage.getItem("user")) {
      patch(authacton.login());
    }
  }, [localStorage.getItem("user")]);
  return (
    <AppBar
      sx={{
        position: "static",
        background: "linear-gradient(#e66465, #9198e5)",
      }}
    >
      <Toolbar>
        <Typography variant="h4">Blogs</Typography>
        {isloading && (
          <Box display="flex" marginLeft="auto" marginRight="auto">
            <Tabs value={value} onChange={(e, vel) => setvalue(vel)}>
              <Tab LinkComponent={Link} to="/blog" label="AllBlogs" />
              <Tab LinkComponent={Link} to="/userblogs" label="MyBlogs" />
              <Tab LinkComponent={Link} to="/addblog" label="addblog" />
            </Tabs>
          </Box>
        )}
        <Box display="flex" marginLeft="auto" sx={{ gap: "1rem" }}>
          {!isloading && (
            <>
              <Button LinkComponent={Link} to="/auth" variant="contained">
                singup
              </Button>
              <Button LinkComponent={Link} to="/auth" variant="contained">
                login
              </Button>
            </>
          )}
          {isloading && (
            <Button onClick={logout} variant="contained">
              logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
