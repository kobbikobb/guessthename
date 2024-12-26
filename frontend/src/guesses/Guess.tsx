import { useState } from 'react';
import {
    Container,
    Row,
    Col,
    Image,
    Button,
    Alert,
    Form
} from 'react-bootstrap';
import { submitGuess } from '../utils/apiUtils';
import babyImage from '../assets/baby.jpg';

interface IResult {
    success: boolean;
    message: string;
}

type GuessProps = {
    userId: string;
    nameTargetId: string;
};

const Guess = ({ userId, nameTargetId }: GuessProps) => {
    const [name, setName] = useState('');
    const [result, setResult] = useState<IResult | null>(null);

    const onSubmitGuess = async () => {
        if (name.length < 1) {
            setResult({ success: false, message: 'Name is required!' });
            return;
        }

        try {
            const result = await submitGuess(userId, nameTargetId, name);

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
                    <Image src={babyImage} height={250} roundedCircle={true} />
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
