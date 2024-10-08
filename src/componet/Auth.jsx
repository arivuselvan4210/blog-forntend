import { Button, Box, Typography, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authacton } from "../store/intex";
import { auth } from "../api/api";
import { dark } from "@mui/material/styles/createPalette";

const Auth = () => {
  const dispatch = useDispatch();
  const navigat = useNavigate();
  const [inputs, setinputs] = useState({ name: "", email: "", password: "" });
  const [err, seterr] = useState({
    name: "",
    email: "",
    password: "",
  });
  const sentrequst = async () => {
    await axios
      .post(`${auth}/singup`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        localStorage.setItem("user", data._id);
      })
      .then(() => {
        navigat("/blog");
        dispatch(authacton.login());
      })
      .catch((err) => console.log(err));
  };
  const handelchange = (e) => {
    setinputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const hanelsubmit = (e) => {
    e.preventDefault();
    const errr = valitaion(inputs);
    seterr(errr);
    if (Object.keys(errr).length === 0) {
      sentrequst("singup");
    }
  };
  const handwitch = () => {
    navigat("/auth/login");
  };

  const valitaion = (user) => {
    const erros = {};
    if (!user.name.trim()) {
      erros.name = "please Enter Your Name";
    } else if (user.name.length < 4) {
      erros.name = "Username must be at least 4 characters long";
    }
    if (!user.email.trim()) {
      erros.email = "please Enter Your Name";
    } else if (user.email.length < 4) {
      erros.email = "Username must be at least 4 characters long";
    }
    if (!user.password) {
      erros.password = "Password is required";
    } else if (user.password.length < 8) {
      erros.password = "Password must be at least 8 characters long";
    }
    return erros;
  };

  return (
    <div>
      <form onSubmit={hanelsubmit}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          marginTop={5}
          gap={"1rem"}
          boxShadow={"10px 10px 20px #ccc"}
          padding={3}
          borderRadius={5}
          maxWidth={400}
          margin={"auto"}
        >
          <Typography variant="h2">SingUp</Typography>

          <TextField
            name="name"
            value={inputs.name}
            onChange={handelchange}
            placeholder="name"
          />
          {err.name && <span style={{ fontSize: "12px" }}>{err.name}</span>}
          <TextField
            name="email"
            value={inputs.email}
            onChange={handelchange}
            placeholder="email"
            type="email"
          />
          {err.email && <span style={{ fontSize: "12px" }}>{err.email}</span>}
          <TextField
            name="password"
            value={inputs.password}
            onChange={handelchange}
            placeholder="password"
            type="password"
          />
          {err.password && (
            <span style={{ fontSize: "12px" }}>{err.password}</span>
          )}
          <Button variant="contained" type="submit">
            Submit
          </Button>
          <Button variant="contained" onClick={handwitch}>
            change to Switch to Login
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
