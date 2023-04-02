import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Input,
  Stack,
} from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SnackBar } from "../../components/CommonComp";
import MainBody from "../../components/MainBody/MainBody";
import { login, reset } from "../../Features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../Features/storeHook";
import { LoginUser } from "../../models/LoginUser.interface";

type Props = {};

const Login = (props: Props) => {
  const [open, setOpen] = useState<boolean>(true);
  const { isLoading, isSuccess, isAuthenticated, token } = useAppSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const clearForm = () => {
    setPassword("");
    setEmail("");
  };

  // loading back dop circle
  const [openModal, setOpenModal] = React.useState(true);
  const handleToggle1 = () => {
    setOpenModal(!openModal);
  };
  // loading back dop circle

  const handleLogin = () => {
    // (e: FormEvent<HTMLFormElement>)
    // e.preventDefault();
    if (email.length === 0 && password.length === 0) return;
    const loginUser: LoginUser = { email, password };
    // console.log(loginUser);

    dispatch(login(loginUser));
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      clearForm();
    }
  }, [isSuccess, dispatch]);
  useEffect(() => {
    if (!isAuthenticated) return;
    navigate("/");
  }, [isAuthenticated]);

  if (isLoading)
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openModal}
        // onClick={handleToggle1}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );

  const message = (
    <React.Fragment>
      <em>login details</em>
      <br />
      <em>Email: tkeAdmin@example.com</em> <br />
      <span>Password: password123</span>
    </React.Fragment>
  );
  return (
    <MainBody>
      <Box
        component="form"
        sx={{
          width: "100%",
          "&.css-wcxda5": {},
          "& .MuiTextField-root": {
            m: 1,
            width: "25ch",
          },
        }}
        noValidate
        autoComplete="off"
        // onSubmit={handleLogin}
      >
        <Stack
          sx={{
            backgroundColor: "#F9F9F9",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.4)",
            width: "30%",
            padding: "2rem",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Login</h2>
          <Stack sx={{ margin: "0.5rem 0" }}>
            <label>Email</label>
            <Input name="email" onChange={(e) => setEmail(e.target.value)} />
          </Stack>
          <Stack sx={{ margin: "2rem 0" }}>
            <label>Password</label>
            <Input
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Stack>
          <Button
            variant="contained"
            onClick={handleLogin}
            disabled={email.length === 0 || password.length === 0}
          >
            Submit
          </Button>
        </Stack>
      </Box>
      <SnackBar open={open} setOpen={setOpen} message={message} />
    </MainBody>
  );
};

export default Login;
// function dispatch(arg0: any) {
//   throw new Error("Function not implemented.");
// }
// function clearForm() {
//   throw new Error("Function not implemented.");
// }
