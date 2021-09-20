import styled from 'styled-components/native';

import { LinearGradient } from 'expo-linear-gradient';

import { Feather } from '@expo/vector-icons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  background: ${props => props.theme.colors.background};
`;

export const Header = styled(LinearGradient)`
  width: 100%;
  height: ${RFPercentage(42)}px;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`;

export const UserContainer = styled.View`
  width: 100%;
  padding: 0 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${getStatusBarHeight() + RFValue(40)}px;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: 10px;
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

export const Matricule = styled.Text`
  color: ${props => props.theme.colors.shape};
  font-family: ${props => props.theme.fonts.regular};
  font-size: ${RFValue(11)}px;
`;

export const Icon = styled(Feather)`
  color: ${props => props.theme.colors.warning};
  font-size: ${RFValue(25)}px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CardsContainer = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingRight: 30,
  }
})`
  position: absolute;
  margin-top: ${RFPercentage(22)}px;
  padding: 0 24px;
  display: flex;
  flex-direction: row;
  margin-right: 16px;
  width: 100%;
`;

export const LastActivesTitle = styled.Text`
  padding: 0 24px;
  margin: 60px 0 10px 0;   
  font-size: ${RFValue(16)}px;
  color: ${props => props.theme.colors.title};
  font-family: ${props => props.theme.fonts.medium};
`;

export const LastActivesContent = styled.ScrollView.attrs({
  horizontal: false,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: 50,
  }
})`
  padding: 0 24px;
`;