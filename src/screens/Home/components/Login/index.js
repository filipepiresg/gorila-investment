import React, {useCallback, useRef, useState} from 'react';
import {Alert} from 'react-native';

import auth from '@react-native-firebase/auth';

import {useFormik} from 'formik';
import * as Yup from 'yup';

import {Container, Input, Title, Button, ButtonTitle, Spinner} from './styles';

const INVARIANTS = {
  MIN_LENGTH_PASSWORD: 4,
  MAX_LENGTH_PASSWORD: 8,
};

const LOGIN_SCHEMA = Yup.object().shape({
  email: Yup.string().email('e-mail not valid').required('e-mail is required'),
  password: Yup.string()
    .min(INVARIANTS.MIN_LENGTH_PASSWORD, 'Password is too short')
    .max(INVARIANTS.MAX_LENGTH_PASSWORD, 'Password is too large')
    .required('password is required'),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = useCallback(async ({email, password}) => {
    try {
      setLoading(true);
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        // await auth().createUserWithEmailAndPassword(email, password);
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Problemas ao autenticar', 'Esse e-mail é inválido!');
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Problemas ao autenticar', 'E-mail e/ou senha inválido!');
      } else {
        Alert.alert('Problemas ao autenticar', 'Contate nosso suporte!');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: handleLogin,
    initialErrors: {
      email: '',
      password: '',
    },
    validationSchema: LOGIN_SCHEMA,
  });

  return (
    <Container>
      <Title>Login</Title>

      <Input
        ref={emailRef}
        autoFocus
        value={formik.values.email}
        onChangeText={formik.handleChange('email')}
        keyboardType="email-address"
        onSubmitEditing={() => passwordRef.current.focus()}
        returnKeyType="next"
        placeholder="Digite seu e-mail"
        hasError={formik.touched.email && formik.errors.email}
      />
      <Input
        ref={passwordRef}
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onSubmitEditing={formik.handleSubmit}
        returnKeyType="send"
        secureTextEntry
        placeholder="Digite sua senha"
        maxLength={INVARIANTS.MAX_LENGTH_PASSWORD}
        hasError={formik.touched.password && formik.errors.password}
      />

      <Button onPress={formik.handleSubmit} disabled={loading}>
        {loading ? <Spinner /> : <ButtonTitle>Logar</ButtonTitle>}
      </Button>
    </Container>
  );
};

export default Login;
