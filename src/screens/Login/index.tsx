import React, { useState } from 'react';

import {Text, Image, Alert} from 'react-native';

import Feather from '@expo/vector-icons/build/Feather';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//@ts-ignore
import ToastManager, { Toast } from 'toastify-react-native';

import Logo from '../../../assets/logo1.svg';
import Input from '../../Componets/Forms/Input';
import Button from '../../Componets/Forms/Button';

import { Container, Header, TitleContent, H1, Form, FormControl, Footer } from './styles';
import { useAuth } from '../../hooks/auth';

const Login: React.FC = () => {
  const { signIn } =  useAuth();
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [loadingLogin, setLoadingLogin] = useState(false);

  const handleLogin = () => {
    setLoadingLogin(true);
    setTimeout(() => {
      if (matricula === '201910906' && senha === '201910906') {
        setLoadingLogin(false);
        signIn();
      } else {
        Alert.alert('Matrícula ou senha inválidos!');
        setLoadingLogin(false);
      }
    }, 1500);

  }

  return (
    <Container>
      <KeyboardAwareScrollView extraHeight={150}>
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
            <Input placeholder="Matrícula" keyboardType='number-pad' onChangeText={(text) => setMatricula(text)} />
            <Feather size={24} color="#CBD1EB" name="user" style={{ position: 'absolute', zIndex: 99999, right: 16 }} />
          </FormControl>
          <FormControl>
            <Input placeholder="Senha" secureTextEntry={true} onChangeText={(text) => setSenha(text)} />
            <Feather size={24} color="#CBD1EB" name="lock" style={{ position: 'absolute', zIndex: 99999, right: 16 }} />
          </FormControl>
          <FormControl>
            <Button title="Entrar na plataforma!" background="primary" onPress={handleLogin} loading={loadingLogin} />
          </FormControl>
        </Form>
        <Footer>Summa 2021 - Todos os direitos reservasos</Footer>
      </KeyboardAwareScrollView>
    </Container>
  );
}

export default Login;