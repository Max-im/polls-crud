import { Router } from 'express';
import controller from './polls.controller';
import validator from './polls.validator';

const router = Router();

router.get('/polls', controller.getPolls);
router.get('/polls/:id', validator.isValidId, controller.getPoll);
router.post('/polls', validator.createPoll, controller.createPoll);
router.put('/polls/:id', validator.isValidId, validator.updatePollBody, controller.updatePoll);
router.delete('/polls/:id', validator.isValidId, controller.deletePoll);

export { router as pollsRouter };
