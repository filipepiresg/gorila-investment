import {darken, transparentize} from 'polished';
import styled from 'styled-components/native';

import {Colors, Metrics} from '~/styles';

export const Container = styled.View`
  width: 100%;
`;

export const Input = styled.TextInput.attrs((props) => ({
  autoCapitalize: 'none',
  autoCorrect: false,
  placeholderTextColor: transparentize(
    0.5,
    props.hasError ? 'red' : Colors.SECONDARY,
  ),
  underlineColorAndroid: 'transparent',
}))`
  font-size: 14px;
  border: ${(props) => (props.hasError ? 2 : 1)}px solid
    ${(props) => (props.hasError ? 'red' : Colors.SECONDARY)};
  margin: 0 0 ${Metrics.PADDING}px;
  padding: ${Metrics.PADDING}px;
  border-radius: 8px;
  color: ${(props) => (props.hasError ? 'red' : Colors.SECONDARY)};
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  margin: 0 0 ${Metrics.PADDING}px;
  padding: ${Metrics.PADDING}px;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: ${Colors.SECONDARY};
  border-radius: 8px;
`;

export const ButtonTitle = styled.Text`
  font-size: 14px;
  color: ${Colors.PRIMARY};
  font-weight: bold;
`;

export const Spinner = styled.ActivityIndicator.attrs({
  size: 18,
  color: Colors.PRIMARY,
})``;

export const Message = styled.Text`
  text-align: center;
  font-size: 12px;
  margin-top: 10px;
  color: ${darken(0.4, Colors.BACKGROUND)};
  font-weight: bold;
`;
