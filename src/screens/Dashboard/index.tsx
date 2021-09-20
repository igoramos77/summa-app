import React, { useState } from 'react';
import { Alert } from 'react-native';

import HighlightCard from '../../Componets/HighlightCard';
import LastActivesCard from '../../Componets/LastActivesCard';

import { Container,
  Header,
  UserContainer,
  UserInfo,
  Avatar,
  UserSaudation,
  FirstSaudation,
  Matricule,
  UserName,
  Icon,
  CardsContainer,
  LastActivesContent,
  LastActivesTitle,
} from './styles';

const confirmLogout = () => {
  return Alert.alert(
    "Deseja descontectar do App?",
    "Você poderá voltar quando quiser.",
    [
      // The "Yes" button
      {
        text: "Sair",
        onPress: () => {
          //setShowBox(false);
        },
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: "Não",
      },
    ]
  );
};

const screens: React.FC = () => {

  const [showBox, setShowBox] = useState(true);
  
  return (
    <Container>
      <Header colors={['#6e61c6', '#a98ef3']} start={{ x: 0, y: 0}} end={{x: 1, y: 1}}>
        <UserContainer>
          <UserInfo>
            <Avatar source={{ uri: 'https://avatars.githubusercontent.com/u/60680294?v=4' }} />
            <UserSaudation>
              <FirstSaudation>Olá, <UserName>Igor!</UserName></FirstSaudation>
              <Matricule>Matrícula: 201910906</Matricule>
            </UserSaudation>
          </UserInfo>
          <Icon name="power" onPress={confirmLogout} />
        </UserContainer>
      </Header>

      <CardsContainer>
        <HighlightCard title="Total de horas integralziadas"
          value={125}
          icon="send"
          background="#5ed4ac" 
        />
        <HighlightCard title="Atividades submetidas"
          value={4}
          icon="bar-chart"
          background="#fbb140"
        />
        <HighlightCard title="Aguardando validação"
          value={2}
          icon="clock"
          background="#1171ef"
        />
        <HighlightCard title="Atividades recusadas"
          value={1}
          icon="archive"
          background="#ff0004" 
        />
      </CardsContainer>

      <LastActivesTitle>Últimos Envios</LastActivesTitle>
      <LastActivesContent>
        <LastActivesCard
          title="Curso ReactJS"
          value={21}
          status="in_validation"
          date="21/09/2021"
        />
        <LastActivesCard
          title="Curso React Native"
          value={14}
          status="approved"
          date="20/09/2021"
        />
        <LastActivesCard
          title="Curso Django Rest Framework"
          value={50}
          status="recused"
          date="15/04/2021"
        />
        <LastActivesCard
          title="Curso ReactJS"
          value={20}
          status="approved"
          date="20/03/2021"
        />
        <LastActivesCard
          title="Curso ReactJS"
          value={77}
          status="approved"
          date="12/02/2021"
        />
      </LastActivesContent>

    </Container>  
  );
}

export default screens;