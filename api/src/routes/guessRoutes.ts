import express from 'express';
import controller from '../controllers/guessController';

const router = express.Router();

router.post('/guess', controller.postGuess);

router.get('/guess', controller.getGuesses);

export default router;
