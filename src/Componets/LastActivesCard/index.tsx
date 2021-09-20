import React from 'react';
import truncate from '../../utils/truncateStrings';
import StatusCard from './StatusCard';

import { Container, Header, Title, Value, Footer, Status, Date } from './styles';

interface ILastActivesCardProps {
  title: string;
  value: string | number;
  status: 'in_validation' | 'approved' | 'recused';
  date: string | Date;
}

const LastActivesCard: React.FC<ILastActivesCardProps> = ({title, value, status, date}) => {
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