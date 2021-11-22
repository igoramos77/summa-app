
import Feather from '@expo/vector-icons/build/Feather';
import React, { useState } from 'react';
import { Modal, Text } from 'react-native';

import Camera from '../Camera';

import { Container, Title, TitleHeader, Icon, CloseModalButton, CloseText, Header } from './styles';

const InputDropZone: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Container onPress={() => {setIsOpen(true)}}>
        <Icon name="camera" />
        <Title>Escanear certificado</Title>
      </Container>
      {isOpen && <Modal visible={isOpen}>
        <Header colors={['#6e61c6', '#a98ef3']} start={{ x: 0, y: 0}} end={{x: 1, y: 1}}>
          <TitleHeader>Escanear certificado</TitleHeader>
        </Header>
        <CloseModalButton onPress={() => {setIsOpen(false)}}><Feather size={22} color="#fff" name="x" /></CloseModalButton>
        <Camera />
      </Modal>}
    </>
  );
}

export default InputDropZone;