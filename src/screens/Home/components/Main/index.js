import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ScrollView} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import DatePicker from 'react-native-datepicker';
import {MaskService} from 'react-native-masked-text';
import PickerSelect from 'react-native-picker-select';

import firestore from '@react-native-firebase/firestore';

import {addYears, format, fromUnixTime, getUnixTime} from 'date-fns';
import {darken, transparentize} from 'polished';

import {Title} from '~/components';
import {Colors, Metrics} from '~/styles';

import Styles, {
  pickerStyle,
  Container,
  Content,
  Spinner,
  RowAddInvestiment,
  InputMasked,
  ResetButton,
  ResetText,
  AddButton,
  AddIcon,
  ActiveType,
  Row,
} from './styles';

const TYPES = {
  RENDA_VARIAVEL: 'RENDA_VARIAVEL',
  RENDA_FIXA: 'RENDA_FIXA',
};

const MONEY_MASK_OPTIONS = {
  precision: 2,
  separator: ',',
  delimiter: '.',
  unit: 'R$ ',
  suffixUnit: '',
};

const INITIAL_VALUE = {
  type: null,
  value: 0,
  date: new Date(),
};

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const Main = ({user: currentUser}) => {
  const [loading, setLoading] = useState(true);
  const [newInvestiment, setNewInvestiment] = useState(INITIAL_VALUE);
  const [data, setData] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(currentUser.uid)
      .onSnapshot((documentSnapshot) => {
        if (documentSnapshot.exists) {
          const values = documentSnapshot.data()?.values || [];
          // ORDER ASC
          values.sort((a, b) => a.date - b.date);

          setData(values);
        } else {
          try {
            firestore().collection('users').doc(currentUser.uid).set({
              values: [],
            });
          } catch (error) {
            console.log('Error on create document in firebase', error);
          }
        }
        setLoading(false);
      });

    return subscriber;
  }, [currentUser.uid]);

  const dataByType = useMemo(() => {
    const _data = [
      {
        name: 'Renda Fixa',
        value: 0,
        color: darken(0.1, Colors.SECONDARY),
        legendFontColor: '#000',
        legendFontSize: 14,
      },
      {
        name: 'Renda Variável',
        value: 0,
        color: transparentize(0.2, Colors.SECONDARY),
        legendFontColor: '#000',
        legendFontSize: 14,
      },
    ];

    data?.forEach(({type, value}) => {
      const indexType = type === TYPES.RENDA_FIXA ? 0 : 1;
      _data[indexType].value += value;
    });

    return _data;
  }, [data]);
  const today = useMemo(() => new Date(), []);

  const addInvestiment = useCallback(async () => {
    if (!newInvestiment.type) {
      return;
    }
    if (newInvestiment.value <= 0) {
      return;
    }
    try {
      setLoading(true);
      await firestore()
        .collection('users')
        .doc(currentUser.uid)
        .set({
          values: [
            ...data,
            {
              type: newInvestiment.type,
              value: newInvestiment.value,
              date: getUnixTime(newInvestiment.date),
            },
          ],
        });
      setNewInvestiment(INITIAL_VALUE);
    } catch (error) {
      console.log('Error on add investiment', error);
    } finally {
      setLoading(false);
    }
  }, [currentUser.uid, data, newInvestiment]);

  const resetValues = useCallback(() => {
    setNewInvestiment(INITIAL_VALUE);
  }, []);

  return (
    <Container>
      <Content>
        <Title>Novo Investimento</Title>

        <PickerSelect
          onValueChange={(value) => {
            setNewInvestiment({...newInvestiment, type: value});
          }}
          items={[
            {
              key: TYPES.RENDA_FIXA,
              label: 'Renda Fixa',
              value: TYPES.RENDA_FIXA,
            },
            {
              key: TYPES.RENDA_VARIAVEL,
              label: 'Renda Variável',
              value: TYPES.RENDA_VARIAVEL,
            },
          ]}
          placeholder={{
            key: null,
            label: 'Escolher tipo de renda',
            value: null,
          }}
          value={newInvestiment.type}
          doneText="OK"
          onDownArrow={() => {}}
          onDonePress={() => {}}
          style={pickerStyle}
          useNativeAndroidPickerStyle={false}
        />
        <InputMasked
          type="money"
          options={MONEY_MASK_OPTIONS}
          value={MaskService.toMask(
            'money',
            newInvestiment.value,
            MONEY_MASK_OPTIONS,
          )}
          onChangeText={(text) => {
            const value = MaskService.toRawValue(
              'money',
              text,
              MONEY_MASK_OPTIONS,
            );
            setNewInvestiment({...newInvestiment, value});
          }}
        />
        <DatePicker
          date={newInvestiment.date}
          mode="date"
          placeholder="Selecione a data de compra"
          format="DD/MM/YYYY"
          maxDate={today}
          minDate={addYears(today, -1)}
          confirmBtnText="Confirmar"
          cancelBtnText="Cancelar"
          showIcon={false}
          onDateChange={(_, date) => {
            setNewInvestiment({...newInvestiment, date});
          }}
          customStyles={{
            dateInput: Styles.dateInput,
            dateText: Styles.dateText,
          }}
          style={Styles.datePicker}
        />
        <RowAddInvestiment>
          <ResetButton onPress={resetValues}>
            <ResetText>Resetar</ResetText>
          </ResetButton>
          <AddButton onPress={addInvestiment}>
            <AddIcon />
          </AddButton>
        </RowAddInvestiment>
      </Content>

      {loading ? (
        <Content>
          <Spinner />
        </Content>
      ) : (
        <>
          <Content>
            <Title>Investimentos</Title>

            <Row>
              <ScrollView>
                <ActiveType isTitle>Renda Fixa</ActiveType>

                {data
                  .filter(({type}) => type === TYPES.RENDA_FIXA)
                  .map(({date, value, type}, index) => (
                    <ActiveType key={`${type}-${index}`}>{`[${format(
                      date ? fromUnixTime(date) : new Date(),
                      'dd-MM-yyyy',
                    )}] ${MaskService.toMask(
                      'money',
                      value,
                      MONEY_MASK_OPTIONS,
                    )}`}</ActiveType>
                  ))}
              </ScrollView>
              <ScrollView>
                <ActiveType isTitle>Renda Variável</ActiveType>

                {data
                  .filter(({type}) => type === TYPES.RENDA_VARIAVEL)
                  .map(({date, value, type}, index) => (
                    <ActiveType key={`${type}-${index}`}>{`[${format(
                      date ? fromUnixTime(date) : new Date(),
                      'dd-MM-yyyy',
                    )}] ${MaskService.toMask(
                      'money',
                      value,
                      MONEY_MASK_OPTIONS,
                    )}`}</ActiveType>
                  ))}
              </ScrollView>
            </Row>
          </Content>
          <Content>
            <Title>Resumo da carteira</Title>

            <PieChart
              data={dataByType}
              width={Metrics.SCREEN_WIDTH - 2 * Metrics.PADDING}
              height={Metrics.SCREEN_HEIGHT * 0.25}
              chartConfig={chartConfig}
              accessor="value"
              backgroundColor="transparent"
              // absolute
            />
          </Content>
        </>
      )}
    </Container>
  );
};

export default Main;
