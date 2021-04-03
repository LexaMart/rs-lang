import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Auth } from './pages/AuthPage/Auth';
import { Games } from './pages/GamesPage/Games';
import { Main } from './pages/MainPage/Main';
import { Promo } from './pages/PromoPage/Promo';
import { Registration } from './pages/RegistrationPage/Registartion';
import { Settings } from './pages/SettingsPage/Settings';
import { Statistic } from './pages/StatisticPage/Statistic';
import { Savannah } from './pages/GamesPage/Savannah/Savannah';
import { MyGame } from './pages/GamesPage/MyGame/MyGame';
import { AudioCall } from './pages/GamesPage/AudioCall/AudioCall';
import { Dictionary } from './pages/DictionaryPage/Dictionary';
import { Sprint } from './pages/GamesPage/Sprint/Sprint';

export const useRoutes = (isAuthenticated) => {
  console.log(isAuthenticated);
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/promo">
          <Promo />
        </Route>
        <Route path="/main" exact>
          <Main />
        </Route>
        <Route path="/games" exact>
          <Games />
        </Route>
        <Route path="/savannah" exact>
          <Savannah />
        </Route>
        <Route path="/mygame" exact>
          <MyGame />
        </Route>
        <Route path="/audiocall" exact>
          <AudioCall />
        </Route>
        <Route path="/sprint" exact>
          <Sprint />
        </Route>
        <Route path="/settings" exact>
          <Settings />
        </Route>
        <Route path="/statistic" exact>
          <Statistic />
        </Route>
        <Route path="/dictionary">
          <Dictionary />
        </Route>
        <Redirect to="/main" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/promo">
        <Promo />
      </Route>
      <Route path="/main" exact>
        <Main />
      </Route>
      <Route path="/games" exact>
        <Games />
      </Route>
      <Route path="/sprint" exact>
        <Sprint />
      </Route>
      <Route path="/savannah" exact>
        <Savannah />
      </Route>
      <Route path="/mygame" exact>
        <MyGame />
      </Route>
      <Route path="/audiocall" exact>
        <AudioCall />
      </Route>
      <Route path="/settings" exact>
        <Settings />
      </Route>
      <Route path="/registration">
        <Registration />
      </Route>
      <Route path="/login">
        <Auth />
      </Route>
      <Redirect to="/promo" />
    </Switch>
  );
};
