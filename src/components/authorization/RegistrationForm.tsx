import { Box, Button, createTheme, Grid, responsiveFontSizes, ThemeProvider, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { authState, eMailAtom, isPasswordAtom, rememberMeAtom, userLoginAtom } from '../../state';
import Registration from './Registration';

interface Props {}
let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function RegistrationForm({}: Props): ReactElement {
  const [auth, setAuth] = useRecoilState(authState);

  const [userLogin, setUserLogin] = useRecoilState(userLoginAtom);
  const [eMail, setEmaiAtom] = useRecoilState(eMailAtom);
  const [password, setPasswordAtom] = useRecoilState(isPasswordAtom);
  const [rememberMe, setRememberMeAtom] = useRecoilState(rememberMeAtom);

  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    alert(
      `Отправляем форму
          Логин: ${userLogin}
          eMail: ${eMail}
          Пароль: ${password}
          Запомнить меня: ${rememberMe}`
    );
    navigate("/sign_in");
    //setAuth({ user: userLogin, isAuthed: false });
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ m: 1 }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <form onSubmit={handleSubmit}>
              <Registration />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                // sx={{ m: 1 }}
              >
                Регистрация
              </Button>
              <Typography variant="subtitle2">
                Уже зарегистрированы?
                <Button component={Link} to="/sign_in">
                  Тогда вам сюда
                </Button>
              </Typography>
            </form>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
