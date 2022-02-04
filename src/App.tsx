import './App.css';

import React, { ReactElement } from 'react';
import { RecoilRoot } from 'recoil';

import AuthProtector from './AuthProtector';
import MainMenu from './components/menu/MainMenu';

interface Props {
  children: ReactElement | ReactElement[];
}

function App() {
  return (
    <RecoilRoot>
      <AuthProtector>
        <div className="App">
          <MainMenu />
        </div>
      </AuthProtector>
    </RecoilRoot>
  );
}

export default App;
