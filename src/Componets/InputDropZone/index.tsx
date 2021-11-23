
import Feather from '@expo/vector-icons/build/Feather';
import React, { useState } from 'react';
import { Modal, Text } from 'react-native';

import Camera from '../Camera';

import { Container, Title, TitleHeader, Icon, CloseModalButton, CloseText, Header } from './styles';

interface IInputDropZoneProps {
  onPress?(): void;
  icon?: string;
  title?: string;
}

const InputDropZone: React.FC<IInputDropZoneProps> = ({onPress, icon, title}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/* <Container onPress={() => {setIsOpen(true)}}> */}
      <Container onPress={onPress}>
        <Icon name={icon ? icon : 'camera'} />
        <Title>{title ? title : 'Anexar certificado'}</Title>
      </Container>
      {isOpen && <Modal visible={isOpen}>
        <Header colors={['#6e61c6', '#a98ef3']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <TitleHeader>Anexar certificado</TitleHeader>
        </Header>
        <CloseModalButton onPress={() => {setIsOpen(false)}}><Feather size={22} color="#fff" name="x" /></CloseModalButton>
        <Camera />
      </Modal>}
    </>
  );
}

export default InputDropZone;