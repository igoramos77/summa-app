import React from 'react';
import { TextInputProps } from 'react-native';

import { Container } from './styles';

interface IInputProps extends TextInputProps {
  disabled?: boolean;
}

const Input: React.FC<IInputProps> = ({disabled, ...rest}) => {

  return (
    <Container
      {...rest} 
      disabled={disabled}
      placeholderTextColor="#c3c3c3"
    />
  );
}

export default Input;