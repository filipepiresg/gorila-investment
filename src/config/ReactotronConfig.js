import Reactotron from 'reactotron-react-native';
import {NativeModules} from 'react-native';

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

  console.tron = tron;
}
