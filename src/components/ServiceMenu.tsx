import { Menu, MenuButton, MenuList, MenuItem, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function ServiceMenu() {
  return (
    <Menu>
      <MenuButton as={Text} cursor="pointer">
        서비스
      </MenuButton>
      <MenuList>
        <Link to="/service/reminder">
          <MenuItem>리마인더</MenuItem>
        </Link>
        <Link to="/service/details">
          <MenuItem>알람</MenuItem>
        </Link>
        <Link to="/service/pricing">
          <MenuItem>맞춤수면</MenuItem>
        </Link>
      </MenuList>
    </Menu>
  );
}

export default ServiceMenu;
