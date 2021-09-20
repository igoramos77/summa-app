import React from 'react';

import { Container, Header, HeaderIntro, Title, IconContainer, Icon, Value } from './styles';

interface IHighlightCardProps {
  title: string;
  icon: string;
  value: number;
  background: string;
}

const HighlightCard: React.FC<IHighlightCardProps> = ({title, icon, value, background}) => {
  return (
    <Container>
      <Header>
        <HeaderIntro>
          <Title>{title}</Title>
          <IconContainer background={background}>
            <Icon name={icon} />
          </IconContainer>
        </HeaderIntro>
        <Value>{value}</Value>
      </Header>
    </Container>
  );
}

export default HighlightCard;