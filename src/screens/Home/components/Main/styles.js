import {StyleSheet} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {darken, desaturate, transparentize} from 'polished';
import styled from 'styled-components/native';

import {Colors, Metrics} from '~/styles';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
`;

export const RowAddInvestiment = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: ${Metrics.PADDING}px;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
`;

export const LogoutButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  position: absolute;
  right: 0;
  align-items: center;
  justify-content: center;
  padding: 0 10px 5px;
  /* background-color: blue; */
`;

export const LogoutIcon = styled(Ionicons).attrs({
  name: 'log-out-outline',
  size: 26,
  color: darken(0.1, 'red'),
})`
  transform: rotate(180deg);
`;

export const DeleteButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  border-radius: 5px;
  width: 30%;
  background-color: red;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  padding: 10px;
`;

export const ResetButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  border-radius: 5px;
  width: 30%;
  background-color: ${desaturate(0.2, 'orange')};
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  padding: 10px;
`;

export const ResetText = styled.Text`
  color: ${Colors.PRIMARY};
  font-size: 18px;
  font-weight: 600;
`;

export const AddButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  border-radius: 5px;
  width: 30%;
  background-color: ${Colors.SECONDARY};
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  padding: 10px;
`;

export const InfoIcon = styled(Entypo).attrs({
  name: 'info-with-circle',
  size: 18,
  color: transparentize(0.5, Colors.SECONDARY),
})`
  position: absolute;
  top: 3px;
  right: 10px;
`;

export const AddIcon = styled(Entypo).attrs({
  name: 'plus',
  size: 22,
  color: Colors.PRIMARY,
})``;

export const Spinner = styled.ActivityIndicator.attrs({
  size: 'large',
  color: Colors.SECONDARY,
})``;

export const InputMasked = styled(TextInputMask).attrs({})`
  width: 100%;
  font-size: 18px;
  padding: 10px;
  text-align: left;
  border: 1px solid ${Colors.SECONDARY};
  border-radius: 8px;
  margin-bottom: ${Metrics.PADDING}px;
`;

export const Active = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  padding: 5px;
  margin-bottom: 5px;
`;

export const Separator = styled.View`
  /* height: 10px; */
  margin: 5px;
  border: 0.5px solid ${transparentize(0.9, 'green')};
`;

export const ActiveType = styled.Text.attrs({
  numberOfLines: 1,
})`
  text-align: ${(props) => (props.isTitle ? 'center' : 'left')};
  font-size: ${(props) => (props.isTitle ? '16' : '14')}px;
  font-weight: ${(props) => (props.isTitle ? 'bold' : 'normal')};
  margin-bottom: ${(props) => (props.isTitle ? '10' : '0')}px;
  margin-right: 20px;
`;

export const pickerStyle = StyleSheet.create({
  placeholder: {
    fontSize: 18,
    color: transparentize(0.2, Colors.SECONDARY),
  },
  inputIOS: {
    fontSize: 18,
    padding: 10,

    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.SECONDARY,
    marginBottom: Metrics.PADDING,

    color: 'black',
  },
  inputAndroid: {
    fontSize: 18,
    padding: 10,

    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.SECONDARY,
    marginBottom: Metrics.PADDING,

    color: 'black',
  },
});

export default StyleSheet.create({
  dateInput: {
    borderWidth: 1,
    borderColor: Colors.SECONDARY,
    borderRadius: 8,
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    // marginBottom: Metrics.PADDING,
  },
  dateText: {
    fontSize: 18,
    padding: 10,
    textAlign: 'left',
  },
  datePicker: {
    width: '100%',
  },
  list: {
    flex: 1,
  },
});
