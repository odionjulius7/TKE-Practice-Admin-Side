import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../Features/storeHook";
import { resetTokenUser } from "../../Features/auth/authSlice";
import { persistor } from "../../Features/reduxStore";

interface Item {
  id: number;
  icon: React.ReactNode;
  label: string;
  path?: string;
}

export const NavBarItems01: Item[] = [
  {
    id: 1,
    icon: <BookOnlineIcon />,
    label: "Trip Requests",
    path: "trip-request",
  },
  { id: 2, icon: <PeopleAltIcon />, label: "Users", path: "users" },
  { id: 3, icon: <PersonAddAltIcon />, label: "Add Users", path: "add-users" },
  {
    id: 4,
    icon: <PlaylistAddIcon />,
    label: "Upload Banner",
    path: "upload-banner",
  }, // Fixed typo
];

export const NavBarItems02: Item[] = [
  {
    id: 5,
    icon: <SupervisorAccountIcon />,
    label: "Add Admin",
    path: "add-admin",
  },
];

/**
 * A navigation list for the admin sidebar, providing links to key sections and logout functionality.
 * Styled with a modern, feminine aesthetic for enhanced user experience.
 */
const NavBarList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    persistor.purge().then(() => console.log("Persisted data has been purged"));
    localStorage.clear();
    dispatch(resetTokenUser());
    navigate("/login");
    window.location.reload(); // Optional: Ensure fresh state
  };

  return (
    <>
      <List disablePadding>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => navigate("/")}
            sx={{
              py: 1.5,
              "&:hover": {
                bgcolor: "#fff5f7", // Soft pink on hover
                color: "#d81b60", // Vibrant pink
              },
              transition: "all 0.3s ease",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 2,
                color: "#757575", // Neutral gray
                "&:hover": { color: "#d81b60" },
                transition: "color 0.3s ease",
              }}
            >
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText
              primary="Home"
              primaryTypographyProps={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                fontSize: "15px",
                color: "#424242", // Dark gray
              }}
            />
          </ListItemButton>
        </ListItem>

        {NavBarItems01.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              onClick={() => navigate(`/${item.path}`)}
              sx={{
                py: 1.5,
                "&:hover": {
                  bgcolor: "#fff5f7",
                  color: "#d81b60",
                },
                transition: "all 0.3s ease",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 2,
                  color: "#757575",
                  "&:hover": { color: "#d81b60" },
                  transition: "color 0.3s ease",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                  fontSize: "15px",
                  color: "#424242",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2, borderColor: "#e0e0e0", opacity: 0.7, mx: 2 }} />

      <List disablePadding>
        {NavBarItems02.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              onClick={() => navigate(`/${item.path}`)}
              sx={{
                py: 1.5,
                "&:hover": {
                  bgcolor: "#fff5f7",
                  color: "#d81b60",
                },
                transition: "all 0.3s ease",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 2,
                  color: "#757575",
                  "&:hover": { color: "#d81b60" },
                  transition: "color 0.3s ease",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                  fontSize: "15px",
                  color: "#424242",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}

        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              py: 1.5,
              "&:hover": {
                bgcolor: "#ffebee", // Light red for logout hover
                color: "#d32f2f", // Reddish tone
              },
              transition: "all 0.3s ease",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 2,
                color: "#757575",
                "&:hover": { color: "#d32f2f" },
                transition: "color 0.3s ease",
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary="Log Out"
              primaryTypographyProps={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                fontSize: "15px",
                color: "#424242",
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
};

export default NavBarList;
