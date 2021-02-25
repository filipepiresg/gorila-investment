import styled from 'styled-components/native';

import {Colors, Metrics} from '~/styles';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.BACKGROUND};
`;

export const Content = styled.View`
  padding: 0 ${Metrics.PADDING}px;
  flex: 1;
`;
