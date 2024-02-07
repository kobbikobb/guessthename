import express from 'express';
import controller from '../controllers/guessController';

const router = express.Router();

// eslint-disable-next-line
router.post('/guess', controller.postGuess);
// eslint-disable-next-line
router.get('/guess', controller.getGuesses);

export default router;
