import { Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React, { ReactElement, useState } from 'react';
import { useRecoilState } from 'recoil';

import { rememberMeAtom, userLoginAtom } from '../../state';
import Passwrd from './Passwrd';

interface Props {}

export default function LogIn({}: Props): ReactElement {
  const [userLogin, setUserLogin] = useRecoilState(userLoginAtom);
  const [rememberMe, setRememberMeAtom] = useRecoilState(rememberMeAtom);

  const handleChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserLogin(event.target.value);
  };

  const handleChangeCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMeAtom(event.target.checked);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2">Авторизация</Typography>
        </Grid>
        <Grid item xs={12} sx={{ m: 1 }}>
          <TextField
            error={!userLogin.includes("@")}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            fullWidth
            onChange={handleChangeLogin}
            value={userLogin}
            name="login"
            sx={{ color: "red" }}
          />
        </Grid>
        <Grid item xs={12} sx={{ m: 1 }}>
          <Passwrd />
        </Grid>
        <Grid item xs={12} sx={{ m: 1 }}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox checked={rememberMe} onChange={handleChangeCheck} />
              }
              label="Запомнить меня"
            />
          </FormGroup>
        </Grid>
      </Grid>
    </Box>
  );
}
