import {StyleSheet} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import Entypo from 'react-native-vector-icons/Entypo';

import {transparentize} from 'polished';
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

export const ResetButton = styled.TouchableOpacity.attrs({
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

export const AddIcon = styled(Entypo).attrs({
  name: 'plus',
  size: 18,
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

export const ActiveType = styled.Text`
  font-size: ${(props) => (props.isTitle ? '16' : '14')}px;
  font-weight: ${(props) => (props.isTitle ? 'bold' : 'normal')};
  margin-bottom: ${(props) => (props.isTitle ? '10' : '0')}px;
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
});
