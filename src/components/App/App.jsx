import React from 'react';
import appStyles from './app.module.css';
import Header from '../Header/Header';
import Main from '../Main/Main';

const App = () => {
  return (
    <div className={`${appStyles.app} text text_type_main-default`}>
      <Header />
      <Main />
    </div>
  );
};

export default App;
