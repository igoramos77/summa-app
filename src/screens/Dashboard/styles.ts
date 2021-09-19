import styled from 'styled-components/native';

import { Feather } from '@expo/vector-icons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background: ${props => props.theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: ${RFPercentage(42)}px;
  background: ${props => props.theme.colors.primary};
`;

export const UserContainer = styled.View`
  width: 100%;
  padding: 0 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: 10px
`;

export const UserSaudation = styled.View`
  margin-left: 16px;
`;

export const FirstSaudation = styled.Text`
  color: ${props => props.theme.colors.shape};
  font-family: ${props => props.theme.fonts.regular};
  font-size: ${RFValue(18)}px;
`;

export const UserName = styled.Text`
  color: ${props => props.theme.colors.shape};
  font-family: ${props => props.theme.fonts.bold};
  font-size: ${RFValue(18)}px;
`;

export const Icon = styled(Feather)`
  color: ${props => props.theme.colors.warning};
  font-size: ${RFValue(32)}px;
`;