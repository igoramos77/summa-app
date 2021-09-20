import React from 'react';

import { Container, StatusSpan } from './styles';

interface IStatusCardProps {
  status: 'in_validation' | 'approved' | 'recused';
}

const StatusCard: React.FC<IStatusCardProps> = ({status}) => {
  return (
    <Container status={status}>
      {status === 'approved' && <StatusSpan>aprovado</StatusSpan>}
      {status === 'in_validation' && <StatusSpan>em validação</StatusSpan>}
      {status === 'recused' && <StatusSpan>recsuado</StatusSpan>}
    </Container>
  );
}

export default StatusCard;