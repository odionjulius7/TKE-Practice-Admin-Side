import React, { useEffect, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Stack,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import { SnackBar } from "../../components/CommonComp";
import MainBody from "../../components/MainBody/MainBody";
import { login, reset } from "../../Features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../Features/storeHook";
import { LoginUser } from "../../models/LoginUser.interface";
import logo from "../../assets/tke-logo.png"; // Update with your logo
import background from "../../assets/download.png"; // Update with a feminine background (e.g., floral or pastel)

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [snackOpen, setSnackOpen] = useState(true);

  const {
    isLoading,
    isSuccess,
    isError,
    //  message,
    isAuthenticated,
  } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    try {
      const loginUser: LoginUser = { email, password };
      await dispatch(login(loginUser)).unwrap();
      clearForm();
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Welcome back!");
      dispatch(reset());
      navigate("/");
    }
    if (isError) {
      toast.error("Login failed. Please try again.");
    }
  }, [isSuccess, isError, dispatch, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    return () => {
      dispatch(reset());
    };
  }, [isAuthenticated, navigate, dispatch]);

  const snackMessage = (
    <React.Fragment>
      <em>Login details</em>
      <br />
      <em>Email: tkeAdmin@example.com</em>
      <br />
      <span>Password: password123</span>
    </React.Fragment>
  );

  return (
    <MainBody>
      <Box
        sx={{
          width: "100%",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // backgroundImage: `url(${background})`, // Replace with a feminine background (e.g., floral or pastel)
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Stack
          sx={{
            width: { xs: "90%", sm: "400px" }, // Responsive width
            padding: "2.5rem",
            bgcolor: "rgba(255, 245, 247, 0.95)", // Soft pinkish-white
            borderRadius: "16px",
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(8px)", // Glass effect
            textAlign: "center",
            border: "1px solid #f8bbd0", // Light pink border
            transition: "transform 0.3s ease-in-out",
            "&:hover": { transform: "scale(1.02)" }, // Subtle hover animation
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="AlignTraits Logo"
            sx={{ height: 70, mb: 2, alignSelf: "center" }}
          />
          <Typography
            variant="h5"
            sx={{
              color: "#d81b60",
              fontWeight: "600",
              mb: 2,
              fontFamily: "'Poppins', sans-serif",
            }} // Vibrant pink
          >
            Welcome, Lovely!
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3} sx={{ mt: 2 }}>
              <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                fullWidth
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    "& fieldset": { borderColor: "#f06292" }, // Soft pink outline
                    "&:hover fieldset": { borderColor: "#ec407a" },
                    "&.Mui-focused fieldset": { borderColor: "#d81b60" },
                  },
                  "& .MuiInputLabel-root": { color: "#f06292" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#d81b60" },
                  bgcolor: "white",
                }}
              />
              <TextField
                label="Password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                fullWidth
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    "& fieldset": { borderColor: "#f06292" },
                    "&:hover fieldset": { borderColor: "#ec407a" },
                    "&.Mui-focused fieldset": { borderColor: "#d81b60" },
                  },
                  "& .MuiInputLabel-root": { color: "#f06292" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#d81b60" },
                  bgcolor: "white",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: "#f06292" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading || !email || !password}
                fullWidth
                sx={{
                  py: 1.5,
                  bgcolor: "#ec407a", // Bright pink
                  "&:hover": { bgcolor: "#d81b60" },
                  borderRadius: "12px",
                  fontSize: "1rem",
                  fontFamily: "'Poppins', sans-serif",
                  textTransform: "none",
                }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Sign In"
                )}
              </Button>
            </Stack>
          </form>
          <Typography
            variant="body2"
            sx={{
              mt: 2,
              color: "#000",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Forgot your password?{" "}
            <a href="/forgot-password" style={{ color: "blue" }}>
              Reset it
            </a>
          </Typography>
        </Stack>
      </Box>
      <SnackBar
        open={snackOpen}
        setOpen={setSnackOpen}
        message={
          <React.Fragment>
            <em>Login details</em>
            <br />
            <em>Email: tkeAdmin@example.com</em>
            <br />
            <span>Password: password123</span>
          </React.Fragment>
        }
        // autoHideDuration={autoHideDuration || 6000}
      />
    </MainBody>
  );
};

export default Login;
