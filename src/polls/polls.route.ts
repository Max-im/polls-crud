import { Router } from 'express';
import controller from './polls.controller';
import validator from './polls.validator';

const router = Router();

router.get('/polls', validator.getPolls, controller.getPolls);
router.put('/polls/:id', validator.isValidId, validator.updatePollBody, controller.updatePoll);
router.post('/polls', validator.createPoll, controller.createPoll);
router.get('/polls/:id', validator.isValidId, controller.getPoll);
router.delete('/polls/:id', validator.isValidId, controller.deletePoll);

export { router as pollsRouter };
