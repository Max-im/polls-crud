import { Request, Response } from 'express';
import CreatePollDto from './dto/createPoll.dto';
import UpdatePollDto from './dto/updatePoll.dto';
import ResponsePollDto from './dto/responsePoll.dto';
import pollsRepository from './polls.repository';
import { INTERNAL_ERROR_MSG } from '../constants';

class PollsController {
    getPolls = async (req: Request, res: Response) => {
        try {
            const result = await pollsRepository.getAll(req.query);
            res.status(result.code).send(result.payload);
        } catch (error) {
            res.status(500).send({ error: INTERNAL_ERROR_MSG });
        }
    };
    
    getPoll = async (req: Request, res: Response) => {
        try {
            const result = await pollsRepository.getItem(req.params.id);
            res.status(result.code).send(result.payload);
        } catch (error) {
            res.status(500).send({ error: INTERNAL_ERROR_MSG });
        }
    };
    
    createPoll = async (req: Request, res: Response) => {
        try {
            const dto = new CreatePollDto(req.body);
            const result = await pollsRepository.create(dto);
            res.status(result.code).send(result.payload);
        } catch (error) {
            res.status(500).send({ error: INTERNAL_ERROR_MSG });
        }
    };

    updatePoll = async (req: Request, res: Response) => {
        try {
            const dto = new UpdatePollDto(req.params.id, req.body);
            const result = await pollsRepository.update(dto);
            const response = result.error ? result.payload : new ResponsePollDto(result.payload);
            res.status(result.code).send(response);
        } catch (error) {
            res.status(500).send({ error: INTERNAL_ERROR_MSG });
        }
    };
    
    deletePoll = async (req: Request, res: Response) => {
        try {
            const result = await pollsRepository.delete(req.params.id);
            res.status(result.code).send(result.payload);
        } catch (error) {
            res.status(500).send({ error: INTERNAL_ERROR_MSG });
        }
    };
}

export default new PollsController();