import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { authState } from '../../state';
import LoginForm from '../authorization/LoginForm';
import RegistrationForm from '../authorization/RegistrationForm';
import Detail from '../book/Detail';
import GetBook from '../book/GetBook';
import Home from '../Home';
import Wether from '../wether/Wether';
import ListMenu from './ListMenu';

//import { authState } from './store';
//import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
export default function MainMenu() {
  const [state, setState] = React.useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState(open);
    };

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const location = useLocation();

  const [auth, setAuth] = useRecoilState(authState);

  const navigate = useNavigate();
  //============================================================================
  //============================================================================
  //============================================================================
  function MainToolBar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleCloseExit = () => {
      localStorage.removeItem("authToken");
      navigate("/sign_in");
      setAnchorEl(null);
    };
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    return (
      // <AppBar position="fixed" open={open}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            disabled={false}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography
            variant="h4"
            component="div"
            sx={{ color: "yellow", flexGrow: 1 }}
          >
            ПОРАБОТАЕМ!?{" "}
          </Typography> */}

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "right" }}
          >
            {auth.user?.firstName}
          </Typography>
          {auth.isAuthed && (
            <div>
              <Tooltip title="Открыть настройки">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  {/* <AccountCircle /> */}
                  <Avatar
                    alt="Remy Sharp"
                    src="https://cherry.org.ua/images/02.jpg"
                  />
                </IconButton>
              </Tooltip>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Изменить аватар</MenuItem>
                <MenuItem onClick={handleCloseExit}>Выйти</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    );
  }
  // console.log(auth);

  return (
    <Box sx={{ mt: 3 }}>
      <CssBaseline />
      {location.pathname !== "/sign_in" &&
      location.pathname !== "/registration" ? (
        <MainToolBar />
      ) : null}

      <React.Fragment key={"left"}>
        {/* <Button onClick={toggleDrawer(true)}></Button> */}
        <SwipeableDrawer
          anchor={"left"}
          open={state}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            {/* ================================/ */}
            <ListMenu />
            {/* ================================/ */}

            <Link to="/sign_in"></Link>
          </Box>
        </SwipeableDrawer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<GetBook />} />
          <Route path="/wether" element={<Wether />} />
          <Route path="/sign_in" element={<LoginForm />} />
          <Route path="/detail:id" element={<Detail />} />
          <Route path="/registration" element={<RegistrationForm />} />
        </Routes>
      </React.Fragment>
    </Box>
  );
}
