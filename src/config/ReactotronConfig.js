import {NativeModules} from 'react-native';
import Reactotron from 'reactotron-react-native';

const host = NativeModules.SourceCode.scriptURL.split('://')[1].split(':')[0];

if (__DEV__) {
  const tron = Reactotron.configure({
    name: 'Gorila Investiment',
    host,
  })
    .useReactNative({
      networking: {
        ignoreUrls: /symbolicate/,
      },
    })
    .connect();

  tron.clear();

  // eslint-disable-next-line no-console
  console.tron = tron;
}
