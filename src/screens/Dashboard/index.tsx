import React from 'react';
import { Text } from 'react-native';

import { Container, Header, UserContainer, UserInfo, Avatar, UserSaudation, FirstSaudation, UserName, Icon } from './styles';

const screens: React.FC = () => {
  return (
    <Container>
      <Header>
        <UserContainer>
          <UserInfo>
            <Avatar source={{ uri: 'https://avatars.githubusercontent.com/u/60680294?v=4' }} />
            <UserSaudation>
              <FirstSaudation>Olá,</FirstSaudation>
              <UserName>Igor</UserName>
            </UserSaudation>
          </UserInfo>
          <Icon name="power" />
        </UserContainer>
      </Header>
    </Container>  
  );
}

export default screens;