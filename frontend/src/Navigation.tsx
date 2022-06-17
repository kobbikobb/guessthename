import react from 'react';
import { Container, Navbar } from 'react-bootstrap';

const Navigation = () => {
  return (
    <Navbar expand="lg" variant="dark" bg="dark">
      <Container>
        <Navbar.Brand href="#">Guess the name!!</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Navigation;
