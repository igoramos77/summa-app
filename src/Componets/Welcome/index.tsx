import React from 'react';
import { View, Text } from 'react-native';

// import { Container } from './styles';

interface IWelcomeProps {
  title: string;
}

const Welcome: React.FC<IWelcomeProps> = ({title}) => {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}

export default Welcome;