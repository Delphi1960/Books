import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import React, { ReactElement, useState } from 'react';
import { useRecoilState } from 'recoil';

import { isPasswordAtom } from '../../state';

interface Props {}

export default function Passwrd({}: Props): ReactElement {
  const [showPasw, setShowPasw] = useState(false);
  const [password, setPasswordAtom] = useRecoilState(isPasswordAtom);

  const handleChangePasw =
    () => (event: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordAtom(event.target.value);
    };
  const handleClickShowPassword = () => {
    setShowPasw(!showPasw);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div>
      <FormControl variant="outlined" fullWidth sx={{ mt: 1 }}>
        <InputLabel htmlFor="outlined-adornment-password">
          Пароль. Не меньше 6 символов
        </InputLabel>
        <OutlinedInput
          fullWidth
          //если длина меньше 6 символов - выделч=яться красным. error=true | false
          error={Boolean(password.length < 6)}
          id="outlined-adornment-password"
          type={showPasw ? "text" : "password"}
          value={password}
          onChange={handleChangePasw()}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPasw ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Пароль. Не меньше 6 символов"
        />
      </FormControl>
    </div>
  );
}
