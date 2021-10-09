import React from 'react';

import { Container, Title, Icon } from './styles';

const InputDropZone: React.FC = () => {
  return (
    <Container>
      <Icon name="camera" />
      <Title>Escanear certificado</Title>
    </Container>
  );
}

export default InputDropZone;