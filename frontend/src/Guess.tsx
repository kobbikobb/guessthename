import react, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Alert,
  Form
} from 'react-bootstrap';
import { submitGuess } from './api';

interface IResult {
  success: boolean;
  message: string;
}

const Guess = () => {
  const [name, setName] = useState('');
  const [result, setResult] = useState<IResult | null>(null);

  const onSubmitGuess = async () => {
    if (name.length < 1) {
      setResult({ success: false, message: 'Name is required!' });
      return;
    }

    try {
      const result = await submitGuess(name);

      setResult({
        success: result.isCorrect === true,
        message:
          result.isCorrect === true
            ? 'Correct!'
            : 'Incorrect, please try again!'
      });
    } catch (e) {
      const error = e as Error;
      setResult({ success: false, message: error.message });
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={2}>
          <Image src="./images/baby.jpg" height={250} roundedCircle={true} />
        </Col>
        <Col xs={10}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name (your guess):</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Text className="text-muted">
                We are awaiting your guess.
              </Form.Text>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => {
                onSubmitGuess();
                e.preventDefault();
              }}
            >
              Submit Guess
            </Button>
          </Form>
          {result && (
            <Alert
              style={{ marginTop: 20 }}
              variant={result.success ? 'success' : 'danger'}
            >
              {result.message}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Guess;
