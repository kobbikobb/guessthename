import React from 'react';
import Guess from './Guess';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Container,
  Row,
  Col,
  Image,
  Navbar,
  Button,
  Alert,
  Form
} from 'react-bootstrap';
import Navigation from './Navigation';

const App = () => {
  return (
    <>
      <Navigation />
      <Container style={{ marginTop: 50 }}>
        <Guess />
      </Container>
    </>
  );
};

export default App;
