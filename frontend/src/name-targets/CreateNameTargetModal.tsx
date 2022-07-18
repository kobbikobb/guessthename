import React, { useState } from 'react';
import { Container, Button, Form, Alert } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { createNameTarget } from '../utils/apiUtils';

type Props = {
  userId: string;
};

const CreateNameTargetModal = ({ userId }: Props) => {
  const [show, setShow] = useState(false);
  const showDialog = () => setShow(true);
  const closeDialog = () => setShow(false);

  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCreateNameTarget = async () => {
    if (name.length < 1) {
      setErrorMessage('Name target is required!');
      return;
    }

    try {
      await createNameTarget(userId, name);
      closeDialog();
    } catch (e) {
      const error = e as Error;
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={showDialog}>
        +
      </Button>
      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Create name target</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                  We will not share the name but we will allow other to guess
                  it.
                </Form.Text>
              </Form.Group>
            </Form>
            {errorMessage && (
              <Alert style={{ marginTop: 20 }} variant={'danger'}>
                {errorMessage}
              </Alert>
            )}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateNameTarget}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateNameTargetModal;
