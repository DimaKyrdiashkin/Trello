import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import fire from 'src/config/fire-conf';
import LoginView from 'src/views/auth/LoginView';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const routing = useRoutes(routes);

  const funLoggedIn = () => {
    const user = fire.auth().currentUser;
    localStorage.setItem('userUid', user.uid);
    setLoggedIn(true);
  };

  const initUser = () => {
    fire.auth().onAuthStateChanged(user => {
      user ? funLoggedIn() : setLoggedIn(false);
    });
  };

  useEffect(initUser, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {loggedIn ? routing : <LoginView />}
    </ThemeProvider>
  );
};

export default App;
