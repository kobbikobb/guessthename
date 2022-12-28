import express from 'express';
import controller from '../controllers/nameTargetController';

const router = express.Router();

// eslint-disable-next-line
router.post('/name-target', controller.createNameTarget);
// eslint-disable-next-line
router.get('/name-target', controller.getNameTargets);

export default router;
