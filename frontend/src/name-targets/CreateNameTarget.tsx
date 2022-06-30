import react, { useState } from 'react';
import { Container, Button, Form, Alert } from 'react-bootstrap';
import { createNameTarget } from '../utils/apiUtils';

type NameTargetProps = {
  userId: string;
};

const NameTarget = ({ userId }: NameTargetProps) => {
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onCreateNameTarget = async () => {
    if (name.length < 1) {
      setErrorMessage('Name target is required!');
      return;
    }

    try {
      await createNameTarget(userId, name);
    } catch (e) {
      const error = e as Error;
      setErrorMessage(error.message);
    }
  };

  return (
    <Container>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name target (to be guessed):</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Text className="text-muted">
            We will not share the name but we will allow other to guess it.
          </Form.Text>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => {
            onCreateNameTarget();
            e.preventDefault();
          }}
        >
          Create Name Target
        </Button>
      </Form>
      {errorMessage && (
        <Alert style={{ marginTop: 20 }} variant={'danger'}>
          {errorMessage}
        </Alert>
      )}
    </Container>
  );
};

export default NameTarget;
