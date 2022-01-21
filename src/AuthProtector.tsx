import { Box, Container, LinearProgress } from '@mui/material';
import axios from 'axios';
import React, { ReactElement, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { authState } from './state';

interface Props {
  children: ReactElement | ReactElement[];
}
export default function AuthProtector({ children }: Props): ReactElement {
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();
  const location = useLocation();
  const [isBootStrapping, setIsBootStrapping] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token === null) throw {};
        const response = await axios.get(
          "http://80.90.229.53:3333/api/auth/bootstrap"
        );
        setIsBootStrapping(false);
        setAuth({ user: response.data, isAuthed: true });
        navigate(location.pathname);
      } catch (error) {
        navigate("/sign_in");
        setIsBootStrapping(false);
      }
    };
    bootstrap();
  }, []);

  if (isBootStrapping) {
    return (
      <Container>
        <Box sx={{ mt: 24 }}>
          <LinearProgress />
        </Box>
      </Container>
    );
  }
  return <div>{children}</div>;
}
