import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(RectButton).attrs({
  activeOpacity: 0.05,
})`
  background-color: ${({ theme }) => theme.colors.shape};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  padding: 18px 16px;
  margin-bottom: 8px;
`;

export const Category = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(11)}px; 
  color: ${({ theme }) => theme.colors.text};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};
`;