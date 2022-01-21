import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import React, { ReactElement, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { filteredListAtom } from '../../state';

interface Props {}

type CheckState = { [key: string]: boolean };

export default function CheckBox({}: Props): ReactElement {
  const arrCheckBox: string[] = [
    "Название",
    "Жанр",
    "Автор",
    "Рейтинг",
    "Цена",
  ];

  //  const obj: CheckState = arrCheckBox.reduce(function (
  //   target: CheckState,
  //   key
  // ) {
  //   target[key] = false;
  //   return target;
  // },
  // {}); //инициализирую object
  // const [checked, setCheckState] = useState<CheckState>(obj);

  const [checked, setCheckState] = useState<CheckState>({
    ["Название"]: false,
    ["Жанр"]: false,
    ["Автор"]: false,
    ["Рейтинг"]: false,
    ["Цена"]: false,
  });
  const [filter, setFilter] = useRecoilState(filteredListAtom);

  function makeFilter() {
    let res = "";
    setFilter("Все");
    for (let key in checked) {
      if (checked[key] === true) {
        res = res + key + " " + "&&" + " ";
      }
    }
    if (res === "") {
      setFilter("Все");
    } else {
      setFilter(res.slice(0, -4));
    }
  }
  useEffect(() => {
    makeFilter();
  }, [checked]);

  const CheckBox = () => {
    return arrCheckBox.map((value, ind) => (
      <FormControlLabel
        key={ind}
        control={
          <Checkbox
            checked={checked[value]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCheckState({ ...checked, [value]: e.target.checked });
            }}
          />
        }
        label={value}
      />
    ));
  };

  return <div></div>;
}
