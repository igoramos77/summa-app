import React from 'react';
import truncate from '../../utils/truncateStrings';
import StatusCard from './StatusCard';

import baseURL from '../../services/baseURL';

import { Text } from 'react-native';

import { Container, Header, Title, Value, Footer, Status, Date } from './styles';

interface ILastActivesCardProps {
  title: string;
  value: string | number;
  status: 'em_validação' | 'aprovado' | 'recusado';
  date: string | Date;
  certificado_img?: string;
}

const extensionIsImage = (value: string) => {
  const ext = value.substr(value.lastIndexOf('.') + 1);
  if (ext !== 'pdf') {
    return true;
  } else {
    return false;
  }
}

const LastActivesCard: React.FC<ILastActivesCardProps> = ({title, value, status, date, certificado_img}) => {
  return (
    <Container>
      <Header>
        <Title>{truncate(title, 24)}</Title>
        {value > 1 ? <Value>{value} horas</Value> : <Value>{value} hora</Value>}
      </Header>
      <Footer>
        <StatusCard status={status} />
        <Date>{date}</Date>
      </Footer>
    </Container>
  );
}

export default LastActivesCard;