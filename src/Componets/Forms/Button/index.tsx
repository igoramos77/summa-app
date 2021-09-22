import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Text } from './styles';

interface IButtonProps extends TouchableOpacityProps {
  title: string;
  background: 'warning' | 'error' | 'primary' | 'success' | 'outline';
}

const Button: React.FC<IButtonProps> = ({title, background, ...rest}) => {
  return (
    <Container background={background} {...rest}>
      <Text>{title}</Text>
    </Container>
  );
}

export default Button;