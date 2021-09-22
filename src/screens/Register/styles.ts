import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  background: ${props => props.theme.colors.background};
  height: 100%;
`;

export const Header = styled(LinearGradient)`
  background: ${props => props.theme.colors.primary};
  width: 100%;
  height: ${RFValue(113)}px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 20px;
`;

export const Title = styled.Text`
  font-family: ${props => props.theme.fonts.bold};
  color: ${props => props.theme.colors.shape};
  font-size: ${RFValue(14)}px;
`;

export const Form = styled.View`
  flex: 1;
  height: 100%;
  padding: 0 24px;
  margin: 24px 0;
  justify-content: space-between;
`;

export const Fields = styled.View`

`;
