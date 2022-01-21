import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import createTheme from '@mui/material/styles/createTheme';
import responsiveFontSizes from '@mui/material/styles/responsiveFontSizes';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React, { ReactElement } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { authState, isPasswordAtom, rememberMeAtom, userLoginAtom } from '../../state';
import LogIn from './LogIn';

interface Props {}

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function LoginForm({}: Props): ReactElement {
  const [auth, setAuth] = useRecoilState(authState);

  const [userLogin, setUserLogin] = useRecoilState(userLoginAtom);
  const [password, setPasswordAtom] = useRecoilState(isPasswordAtom);
  const [rememberMe, setRememberMeAtom] = useRecoilState(rememberMeAtom);

  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://80.90.229.53:3333/api/auth/login",
        {
          email: userLogin,
          password: password,
        },
        { withCredentials: false }
      );
      setAuth({ user: response.data, isAuthed: true });
      // setUserLogin("");
      // setPasswordAtom("");
      navigate("/");
    } catch (error) {
      console.error("error!");
      console.log(error);
    }

    // if (rememberMe) {
    //   localStorage.setItem("userName", userLogin);
    // }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ m: 1 }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <form onSubmit={handleSubmit}>
              <LogIn />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                // sx={{ m: 1 }}
              >
                Вход
              </Button>
              <Typography variant="subtitle2">
                Нет аккаунта?
                <Button component={Link} to="/registration">
                  Зарегистрируйтесь здесь
                </Button>
              </Typography>
            </form>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
