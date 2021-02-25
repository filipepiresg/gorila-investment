import React from 'react';
import {Platform, StatusBar} from 'react-native';

import {Colors} from '~/styles';

import {Container} from './styles';

const Home = () => (
  <Container>
    <StatusBar
      backgroundColor={Colors.SECONDARY}
      barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
    />
  </Container>
);

export default Home;
