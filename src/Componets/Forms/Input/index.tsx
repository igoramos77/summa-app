import React from 'react';
import { TextInputProps } from 'react-native';

import { Container } from './styles';

interface IInputProps extends TextInputProps {
  disabled?: boolean;
  background?: string;
}

const Input: React.FC<IInputProps> = ({disabled, background, ...rest}) => {

  return (
    <Container
      {...rest} 
      disabled={disabled}
      background={background}
      placeholderTextColor="#c3c3c3"
    />
  );
}

export default Input;