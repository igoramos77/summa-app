import React, { useState } from 'react';

import {Text, Image, Alert} from 'react-native';

import { Container, Header, TitleContent, H1, Form, FormControl, Footer } from './styles';

import Logo from '../../../assets/logo1.svg';
import Input from '../../Componets/Forms/Input';
import Feather from '@expo/vector-icons/build/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from '../../Componets/Forms/Button';

const Login: React.FC = () => {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    if (matricula === '201910906' && senha === '201910906') {
      Alert.alert('Seja bem vindo!');
    } else {
      Alert.alert('Ops!!!!');
    }
  }

  return (
    <Container>
      <Header colors={['#5E72E4', '#5E72E4']} start={{ x: 0, y: 0}} end={{x: 1, y: 1}}>
        <TitleContent>
          <Logo style={{marginBottom: 40}} />
          <H1>Controle suas atividades </H1>
          <H1>de forma muito simples</H1>
          <H1>forma muito simples</H1>
        </TitleContent>
      </Header>
      
      <Form>
        <FormControl>
          <Input placeholder="Matrícula" onChangeText={(text) => setMatricula(text)} />
          <Feather size={26} color="#CBD1EB" name="user" style={{  position: 'absolute', zIndex: 99999, right: 16 }} />
        </FormControl>
        <FormControl>
          <Input placeholder="Senha" secureTextEntry={true} onChangeText={(text) => setSenha(text)} />
          <Feather size={26} color="#CBD1EB" name="lock" style={{  position: 'absolute', zIndex: 99999, right: 16 }} />
        </FormControl>
        <FormControl>
          <Button title="Entrar na plataforma!" background="primary" onPress={handleLogin} />
        </FormControl>
      </Form>
      

      <Footer>Summa 2021 - Todos os direitos reservasos</Footer>
      
    </Container>
  );
}

export default Login;