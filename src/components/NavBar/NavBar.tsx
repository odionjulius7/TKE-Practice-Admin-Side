// import { NavBarItems01, NavBarItems02 } from "./counts/NavBarItems";

import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import NavBarList from "./NavBarList";
import { navBarstyles } from "./stylesMui";

type Props = {};

const NavBar = (props: Props) => {
  return (
    <Drawer sx={navBarstyles.drawer} variant="permanent" anchor="left">
      <Toolbar />
      <Divider />
      {/*  */}
      <NavBarList />
      {/*  */}
    </Drawer>
  );
};

export default NavBar;
