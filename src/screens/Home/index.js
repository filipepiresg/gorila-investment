import React, {useCallback, useEffect, useState} from 'react';
import {Platform, StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import auth from '@react-native-firebase/auth';

import {Colors} from '~/styles';

import Login from './components/Login';
import Main from './components/Main';
import {Container, Content} from './styles';

const Home = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  const onAuthStateChanged = useCallback((_user) => {
    setUser(_user);

    if (initializing) {
      setInitializing(false);
      SplashScreen.hide();
    }
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <Container>
      <StatusBar
        backgroundColor={Colors.SECONDARY}
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
      />
      <Content>{!user ? <Login /> : <Main user={user} />}</Content>
    </Container>
  );
};

export default Home;
