import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import { isValidId } from '../utils';

class PollValidator {
    createPoll(req: Request, res: Response, next: NextFunction) {
        const errors: Record<string, string> = {};              
        const requiredFields = ['question', 'options'];
        
        for(const field of requiredFields) {
            if (!req.body[field]) {
                errors[field] = `'${field}' field is required`;
            }
        }

        if (!errors.question && validator.isEmpty(req.body.question)) {
            errors.question = 'Question min length is 1';
        }

        if (!errors.options && (!Array.isArray(req.body.options) || req.body.options.length === 0)) {
            errors.options = 'Please add at least one option';
        }
        
        if (Object.keys(errors).length) {
            res.status(400).json({ errors });
            return; 
        }
        next();
    }
    
    isValidId(req: Request, res: Response, next: NextFunction) {        
        if (!isValidId(req.params.id)) {
            res.status(400).json({ errors: { id: 'Invalid id' } });
            return; 
        }

        next();
    }
    
    updatePollBody(req: Request, res: Response, next: NextFunction) {        
        const errors: Record<string, string> = {};
        if (!req.body.question && !req.body.options) {
            errors.fields = 'At least one field is required';
        }

        if (req.body.question && validator.isEmpty(req.body.question)) {
            errors.question = 'Question min length is 1';
        }

        if (req.body.options && (!Array.isArray(req.body.options) || req.body.options.length === 0)) {
            errors.options = 'Please add at least one option';
        }

        if (Object.keys(errors).length) {
            res.status(400).json({ errors });
            return; 
        }

        next();
    }
}

export default new PollValidator();