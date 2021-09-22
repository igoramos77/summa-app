import React, { useState } from 'react';
import { TextInputProps } from 'react-native';

import { Container } from './styles';

import cnpjMask from '../../../utils/cnpjMask';

interface IInputProps extends TextInputProps {
  disabled?: boolean;
  maskCnpj?: boolean;
  setCnpjValue(value: any): void;
}

const InputCnpjMask: React.FC<IInputProps> = ({disabled, maskCnpj, setCnpjValue, ...rest}) => {

  return (
    <Container
      {...rest} 
      disabled={disabled}
      placeholderTextColor="#c3c3c3"
      onChangeText={(value) => {
        setCnpjValue(cnpjMask(value));
        alert(value)
      }}
    />
  );
}

export default InputCnpjMask;