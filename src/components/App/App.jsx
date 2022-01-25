import React from 'react';
import appStyles from './app.module.css';
import Header from '../Header/Header';

const App = () => {
  return (
    <div className={`${appStyles.app} text text_type_main-default`}>
      <Header />
    </div>
  );
};

export default App;
