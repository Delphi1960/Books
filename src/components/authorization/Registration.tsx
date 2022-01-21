import { Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React, { ReactElement, useState } from 'react';
import { useRecoilState } from 'recoil';

import { eMailAtom, rememberMeAtom, userLoginAtom } from '../../state';
import Passwrd from './Passwrd';

interface Props {}

export default function Registration({}: Props): ReactElement {
  const [userLogin, setUserLogin] = useRecoilState(userLoginAtom);
  const [eMail, setEmailAtom] = useRecoilState(eMailAtom);
  //const [password, setPassword] = useRecoilState(isPasswordAtom);
  const [rememberMe, setRememberMeAtom] = useRecoilState(rememberMeAtom);

  const handleChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserLogin(event.target.value);
  };
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailAtom(event.target.value);
  };

  const handleChangeCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMeAtom(event.target.checked);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2">Регистрация</Typography>
        </Grid>
        <Grid item xs={12} sx={{ m: 1 }}>
          <TextField
            id="outlined-basic"
            label="Имя"
            variant="outlined"
            fullWidth
            onChange={handleChangeLogin}
            value={userLogin}
            name="login"
          />
        </Grid>
        <Grid item xs={12} sx={{ m: 1 }}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            fullWidth
            onChange={handleChangeEmail}
            value={eMail}
            name="email"
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
