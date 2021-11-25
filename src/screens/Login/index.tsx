import React from 'react';

import {Text, Image} from 'react-native';

import { Container, Header,  } from './styles';

import Logo from '../../../assets/logo1.svg';

const Login: React.FC = () => {
  return (
    <Container>
      <Header colors={['#6e61c6', '#a98ef3']} start={{ x: 0, y: 0}} end={{x: 1, y: 1}}>
          <Logo />
      </Header>
      <Text>Login</Text>
      
    </Container>
  );
}

export default Login;