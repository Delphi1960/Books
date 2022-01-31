import { Alert, Box, Stack } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { WetherType } from '../../types/wether.type';

type Props = {};

const API_KEY = "518d07c7fa89441caa4692dbba526972";

export default function Wether({}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadWether, setLoadWether] = useState<WetherType | null>(null);

  const getWether = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=Одеса,ua&units=metric&APPID=ba70f668d22d5358ad51d7723c6ae867&lang=ru`
        // `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=Одеса,ua&units=metric&APPID=ba70f668d22d5358ad51d7723c6ae867&lang=ru`
      );
      // setLoadWether(response.data.totalItems > 0 ? response.data.items : []);
      setLoadWether(response.data);
      //   setBooksStateAtom(
      //     response.data.totalItems > 0 ? response.data.items : []
      //   );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getWether();
  }, []);

  console.log(loadWether);

  return (
    <Box sx={{ mt: 10, textAlign: "left" }}>
      {loadWether !== null ? (
        <ul>
          <li>
            Дата:{new Date(loadWether.dt * 1000).toLocaleDateString("ru")}
          </li>
          <li>Город:{loadWether.name}</li>
          <li>Широта:{loadWether.coord.lat}</li>
          <li>Долгота:{loadWether.coord.lon}</li>
          <li>Погодные условия:{loadWether.weather[0].main}</li>
          <li>Погодные условия:{loadWether.weather[0].description}</li>
          <li>Влажность:{loadWether.weather[0].description}</li>
          <li>
            Погодные условия:
            <img src={loadWether.weather[0].icon} />
          </li>
          <li>Облачность:{loadWether.clouds.all}%</li>
          <li>Влажность:{loadWether.main.humidity}%</li>
          <li>Давление:{loadWether.main.pressure}гПа</li>
          <li>Температура:{loadWether.main.temp}С</li>
          <li>Температура min:{loadWether.main.temp_min}С</li>
          <li>Температура max:{loadWether.main.temp_max}С</li>

          <li>Температура по ощущениям :{loadWether.main.feels_like}С</li>
        </ul>
      ) : (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">Что-то пошло не так!</Alert>
        </Stack>
      )}
    </Box>
  );
}
