import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Alert, View} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import DatePicker from 'react-native-datepicker';
import {MaskService} from 'react-native-masked-text';
import PickerSelect from 'react-native-picker-select';

import auth from '@react-native-firebase/auth';
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
  DeleteButton,
  ResetText,
  AddButton,
  AddIcon,
  ActiveType,
  Separator,
  LogoutButton,
  LogoutIcon,
  Active,
  InfoIcon,
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
  isNew: true,
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
  const dataSorted = useMemo(
    () =>
      // ORDER ASC
      data?.sort((a, b) => a.date - b.date) || [],
    [data],
  );
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

  const logout = useCallback(async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.log('Error on sign out', error);
    }
  }, []);

  const resetValues = useCallback(() => {
    setNewInvestiment(INITIAL_VALUE);
  }, []);

  const deleteInvestiment = useCallback(() => {
    async function _delete() {
      try {
        setLoading(true);

        const values = data.filter(
          (item) =>
            !(
              item.type === newInvestiment.type &&
              item.date === getUnixTime(newInvestiment.date) &&
              item.value === newInvestiment.value
            ),
        );

        await firestore()
          .collection('users')
          .doc(currentUser.uid)
          .update({values});

        resetValues();
      } catch (error) {
        console.log('Erro on delete investiment', error);
      } finally {
        setLoading(false);
      }
    }

    Alert.alert(
      'Excluir investimento',
      'Tem certeza que deseja excluir esse investimento?',
      [
        {
          onPress: _delete,
          style: 'destructive',
          text: 'Sim',
        },
        {
          // onPress: resetValues,
          style: 'cancel',
          text: 'Não',
        },
      ],
    );
  }, [currentUser.uid, data, newInvestiment, resetValues]);

  return (
    <Container>
      <View style={Styles.header}>
        <Title>
          {newInvestiment.isNew ? 'Novo Investimento' : 'Editar Investimento'}
        </Title>
        <LogoutButton onPress={logout}>
          <LogoutIcon />
        </LogoutButton>

        <PickerSelect
          onValueChange={(value) => {
            setNewInvestiment({...newInvestiment, type: value});
          }}
          disabled={!newInvestiment.isNew}
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
          includeRawValueInChangeText
          onChangeText={(_, rawValue) => {
            if (!newInvestiment.isNew) return;

            // const value = MaskService.toRawValue(
            //   'money',
            //   text,
            //   MONEY_MASK_OPTIONS,
            // );
            setNewInvestiment({...newInvestiment, value: rawValue});
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
          disabled={!newInvestiment.isNew}
        />

        <RowAddInvestiment>
          <ResetButton onPress={resetValues}>
            <ResetText>Resetar</ResetText>
          </ResetButton>
          {!newInvestiment.isNew ? (
            <DeleteButton onPress={deleteInvestiment}>
              <ResetText>Excluir</ResetText>
            </DeleteButton>
          ) : (
            <AddButton onPress={addInvestiment}>
              <AddIcon />
            </AddButton>
          )}
        </RowAddInvestiment>
      </View>

      <Content>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Title>Investimentos</Title>

            <ActiveType isTitle>Renda Fixa</ActiveType>

            {dataSorted.filter(({type}) => type === TYPES.RENDA_FIXA).length ===
            0 ? (
              <ActiveType isEmpty>Nenhum investimento adicionado</ActiveType>
            ) : (
              dataSorted
                .filter(({type}) => type === TYPES.RENDA_FIXA)
                .map(({date, value, type}, index, arr) => {
                  const isLast = arr.length - 1 === index;
                  return (
                    <Fragment key={`${type}-${index}`}>
                      <Active
                        onPress={() => {
                          setNewInvestiment({
                            type,
                            value,
                            date: fromUnixTime(date),
                            isNew: false,
                          });
                        }}>
                        <ActiveType>{`[${format(
                          date ? fromUnixTime(date) : new Date(),
                          'dd-MM-yyyy',
                        )}] ${MaskService.toMask(
                          'money',
                          value,
                          MONEY_MASK_OPTIONS,
                        )}`}</ActiveType>
                        <InfoIcon />
                      </Active>
                      {!isLast && <Separator />}
                    </Fragment>
                  );
                })
            )}

            <ActiveType isTitle>Renda Variável</ActiveType>

            {dataSorted.filter(({type}) => type === TYPES.RENDA_VARIAVEL)
              .length === 0 ? (
              <ActiveType isEmpty>Nenhum investimento adicionado</ActiveType>
            ) : (
              dataSorted
                .filter(({type}) => type === TYPES.RENDA_VARIAVEL)
                .map(({date, value, type}, index, arr) => {
                  const isLast = arr.length - 1 === index;
                  return (
                    <Fragment key={`${type}-${index}`}>
                      <Active
                        onPress={() => {
                          setNewInvestiment({
                            type,
                            value,
                            date: fromUnixTime(date),
                            isNew: false,
                          });
                        }}>
                        <ActiveType>{`[${format(
                          date ? fromUnixTime(date) : new Date(),
                          'dd-MM-yyyy',
                        )}] ${MaskService.toMask(
                          'money',
                          value,
                          MONEY_MASK_OPTIONS,
                        )}`}</ActiveType>
                        <InfoIcon />
                      </Active>
                      {!isLast && <Separator />}
                    </Fragment>
                  );
                })
            )}
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
          </>
        )}
      </Content>
    </Container>
  );
};

export default Main;
