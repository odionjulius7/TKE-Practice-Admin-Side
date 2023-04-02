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
import { Divider } from "@mui/material";
import { Navigate, NavigateFunction, useNavigate } from "react-router-dom";

import { navBarstyles } from "./stylesMui";
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
    label: "Trip Request",
    path: "trip-request",
  },
  {
    id: 2,
    icon: <PeopleAltIcon />,
    label: "Users",
    path: "users",
  },
  {
    id: 3,
    icon: <PersonAddAltIcon />,
    label: "Add Users",
    path: "add-users",
  },
  {
    id: 4,
    icon: <PlaylistAddIcon />,
    label: "Upload Banner",
    path: "uplaod-banner",
  },
];
export const NavBarItems02: Item[] = [
  {
    id: 5,
    icon: <SupervisorAccountIcon />,
    label: "Add Admin",
    path: "add-admin",
  },
];

type Props = {};

const NavBarList = (props: Props) => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();
  const navigateTo = () => {
    // localStorage.clear();
    dispatch(resetTokenUser());
    persistor.purge().then(() => {
      console.log("Persisted data has been purged");
    });
  };
  return (
    <>
      <ListItem
        onClick={() => {
          const to = `/`;
          return navigate(to);
        }}
        disablePadding
      >
        <ListItemButton
          sx={{
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.1)",
              cursor: "pointer",
            },
          }}
        >
          <ListItemIcon>
            <DashboardIcon
              sx={{
                color: "rgba(255,255,255,0.7) !important",
                marginLeft: "20px !important",
                marginRight: "30px !important",
              }}
            />
          </ListItemIcon>
          <ListItemText sx={navBarstyles.text} primary="Home" />
        </ListItemButton>
      </ListItem>

      <List>
        {NavBarItems01.map((text, index) => (
          <ListItem
            onClick={() => {
              const to = `/${text.path}`;
              return navigate(to);
            }}
            key={text.id}
            disablePadding
          >
            <ListItemButton sx={navBarstyles.textHover}>
              <ListItemIcon sx={navBarstyles.icons}>{text.icon}</ListItemIcon>
              <ListItemText sx={navBarstyles.text} primary={text.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />
      <List>
        {NavBarItems02.map((text, index) => (
          <ListItem
            onClick={() => {
              const to = `/${text.path}`;
              return navigate(to);
            }}
            key={text.id}
            disablePadding
          >
            <ListItemButton sx={navBarstyles.textHover}>
              <ListItemIcon sx={navBarstyles.icons}>{text.icon}</ListItemIcon>
              <ListItemText sx={navBarstyles.text} primary={text.label} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem
          onClick={() => {
            navigateTo();
            window.location.reload();
            // window.location.replace("/login");
          }}
          disablePadding
        >
          <ListItemButton sx={navBarstyles.textHover}>
            <ListItemIcon sx={navBarstyles.icons}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText sx={navBarstyles.text} primary={"Log Out"} />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
};

export default NavBarList;
