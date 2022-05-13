import React from 'react';
import Guess from './Guess';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Container
} from 'react-bootstrap';
import Navigation from './Navigation';
import clientjs from 'clientjs';
import { getUserFingerprint } from './utils/clientUtils';

const App = () => {
  const userId = getUserFingerprint();

  return (
    <>
      <Navigation />
      <Container style={{ marginTop: 50 }}>
        <Guess userId={userId}/>
      </Container>
    </>
  );
};

export default App;
