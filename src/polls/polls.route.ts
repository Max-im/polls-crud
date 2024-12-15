import { Router } from 'express';
import controller from './polls.controller';
import validator from './polls.validator';
import { asyncHandler } from '../handlers';

const router = Router();

router.get('/polls', validator.getPolls, asyncHandler(controller.getPolls));
router.put('/polls/:id', validator.isValidId, validator.updatePollBody, asyncHandler(controller.updatePoll));
router.post('/polls', validator.createPoll, asyncHandler(controller.createPoll));
router.get('/polls/:id', validator.isValidId, asyncHandler(controller.getPoll));
router.delete('/polls/:id', validator.isValidId, asyncHandler(controller.deletePoll));

export { router as pollsRouter };
