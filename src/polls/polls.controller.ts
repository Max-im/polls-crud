import { Request, Response } from 'express';
import CreatePollDto from './dto/createPoll.dto';
import UpdatePollDto from './dto/updatePoll.dto';
import pollsRepository from './polls.repository';

class PollsController {
    getPolls = async (req: Request, res: Response) => {
        const result = await pollsRepository.getAll(req.query);
        res.status(result.code).send(result.payload);
    };
    
    getPoll = async (req: Request, res: Response) => {
        const result = await pollsRepository.getItem(req.params.id);
        res.status(result.code).send(result.payload);
    };
    
    createPoll = async (req: Request, res: Response) => {
        const dto = new CreatePollDto(req.body);
        const result = await pollsRepository.create(dto);
        res.status(result.code).send(result.payload);
    };

    updatePoll = async (req: Request, res: Response) => {
        const dto = new UpdatePollDto(req.params.id, req.body);
        const result = await pollsRepository.update(dto);
        res.status(result.code).send(result.payload);
    };
    
    deletePoll = async (req: Request, res: Response) => {
        const result = await pollsRepository.delete(req.params.id);
        res.status(result.code).send(result.payload);
    };
}

export default new PollsController();