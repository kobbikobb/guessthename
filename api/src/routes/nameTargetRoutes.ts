import express from 'express';
import controller from '../controllers/nameTargetController';

const router = express.Router();

router.post('/name-target', controller.createNameTarget);
router.get('/name-target', controller.getNameTargets);

export default router;
