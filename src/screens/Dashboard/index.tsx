import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Alert } from 'react-native';

import api from '../../services/api';

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

interface IActivitiesProps {
  id: number;
  external_id: string;
  descricao: string;
  empresa: string;
  cnpj: string;
  carga_horaria_informada: number;
  carga_horaria_integralizada?: number | null;
  justificativa?: string | null;
  certificado: string;
  status: 'em_validação' | 'aprovado' | 'recusado';
  is_active: boolean;
  create_at: string;
  update_at: string;
  usuario: number;
  curso: number;
  categoria: number;
}

interface IUserStatistics {
  total_horas_integralizadas: number;
  total_atividades_submetidas: number;
  total_atividades_aguardando_validacao: number;
  total_atividades_recusadas: number;
}




const screens: React.FC = () => {
  const [lastActivities, setLastActivities] = useState<IActivitiesProps[]>([]);
  const [userStatistics, setUserStatistics] = useState<IUserStatistics[]>([]);

  const [showBox, setShowBox] = useState(true);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      async function loadData() {
        const response = await api.get('api/v1/usuarios/2/total-statistics/');
        console.log('LIST STATISTICS FROM USER >>>>>>>>>>>>>>>>>>>');
        console.log(response.data);
        setUserStatistics(response.data);
      }
      loadData();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      async function loadData() {
        const response = await api.get('/api/v1/usuarios/2/atividades/');
        console.log('LIST LAST ACTIVITIES >>>>>>>>>>>>>>>>>>>');
        console.log(response.data);
        setLastActivities(response.data);
      }
      loadData();
    }, [])
  );


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
        {lastActivities.map((activitie, index) => (
          <LastActivesCard
            key={index}
            title={activitie.descricao}
            value={activitie.carga_horaria_integralizada || activitie.carga_horaria_informada}
            status={activitie.status}
            date={activitie.create_at}
            certificado_img={activitie.certificado}
          />
        ))}
      </LastActivesContent>

    </Container>  
  );
}

export default screens;