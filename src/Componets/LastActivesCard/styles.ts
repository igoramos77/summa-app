import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  position: relative;
  background: ${props => props.theme.colors.shape};
  border-radius: 5px;
  padding: 19px 23px;
  margin-top: 16px;
`;

export const Header = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${props => props.theme.colors.title};
  font-family: ${props => props.theme.fonts.medium};
  max-width: 80%;
`;

export const Value = styled.Text`
  color: ${props => props.theme.colors.subtitle};
`;

export const Footer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between; 
`;

export const Status = styled.Text`
  padding: 5px;
  border-radius: 15px;
  margin-top: 5px;
`;

export const Date = styled.Text`
  color: ${props => props.theme.colors.subtitle};
`;


