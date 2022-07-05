import { NextPage } from 'next';
import React from 'react';

import Container, { ContainerStyle } from '@layouts/Container';

const Playground: NextPage = () => {
  return (
    <Container style={ContainerStyle.Light}>
      <div>test</div>
      <h1>test test</h1>
    </Container>
  );
};

export default Playground;
