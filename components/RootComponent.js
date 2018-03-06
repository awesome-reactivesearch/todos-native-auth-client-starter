import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { Container } from 'native-base';
import { ReactiveBase } from '@appbaseio/reactivesearch-native';
// create auth0 service here

import CONFIG from '../constants/Config';
import COLORS from '../constants/Colors';
import MainTabNavigator from './MainTabNavigator';

export default class RootComponent extends React.Component {
  state = {
    accessToken: null,
    avatar: null,
    name: null
  }

  // method to handle login
  handleLogin = () => {
    console.log('Handling login')
  }

  // method to handle logout
  handleLogout = () => {
    console.log('Handling logout')
  }

  renderStatusBar = () => <StatusBar backgroundColor={COLORS.secondary} barStyle="dark-content" />;

  render = () => {
    return (
      <ReactiveBase app={CONFIG.app} credentials={CONFIG.credentials} type={CONFIG.type}>
        <Container>
          <MainTabNavigator
            // pass via props
          />
        </Container>
      </ReactiveBase>
    );
  };
}
