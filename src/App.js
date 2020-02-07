import React from 'react';
import MainScreen from './component/MainScreen';
import './styles/styles.scss';
import { BrowserRouter } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <MainScreen />
  </BrowserRouter>
);

export default App;
