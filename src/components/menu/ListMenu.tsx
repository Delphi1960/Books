import { AccountBalance, Brightness4, MenuBook } from '@mui/icons-material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React, { ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface Props {}

export default function ListMenu({}: Props): ReactElement {
  const location = useLocation();
  const isActive = (path: string) =>
    location.pathname === path ? "primary" : "inherit";
  const isActiveFontColor = (path: string) =>
    location.pathname === path ? "blue" : "secondary.color";

  return (
    <List>
      {/* =============================================================================== */}
      <ListItem
        button
        selected={location.pathname === "/"}
        component={Link}
        to="/"
      >
        <ListItemIcon>
          <AccountBalance color={isActive("/")} />
        </ListItemIcon>
        <ListItemText primary={"Home"} sx={{ color: isActiveFontColor("/") }} />
      </ListItem>

      {/* =============================================================================== */}
      <ListItem
        button
        selected={location.pathname === "/book"}
        component={Link}
        to="/book"
      >
        <ListItemIcon>
          <MenuBook color={isActive("/book")} />
        </ListItemIcon>
        <ListItemText
          primary={"Книги"}
          sx={{ color: isActiveFontColor("/book") }}
        />
      </ListItem>
      {/* =============================================================================== */}
      <ListItem
        button
        selected={location.pathname === "/wether"}
        component={Link}
        to="/wether"
      >
        <ListItemIcon>
          <Brightness4 color={isActive("/wether")} />
        </ListItemIcon>
        <ListItemText
          primary={"Погода"}
          sx={{ color: isActiveFontColor("/wether") }}
        />
      </ListItem>
    </List>
  );
}
