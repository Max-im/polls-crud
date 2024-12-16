import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

function cleanOptions(options: string[]) {
    if (Array.isArray(options)) {
        return options.filter((option: string) => typeof option === 'string' && !validator.isEmpty(option.trim()));
    } else {
        return [];
    }
}
class PollValidator {
    createPoll(req: Request, res: Response, next: NextFunction) {
        const errors: Record<string, string> = {};              
        const requiredFields = ['question', 'options'];
        
        for(const field of requiredFields) {
            if (!req.body[field]) {
                errors[field] = `'${field}' field is required`;
            }
        }

        if (!errors.question && (typeof req.body.question !== 'string' || validator.isEmpty(req.body.question))) {
            errors.question = 'Question min length is 1';
        }

        if (!errors.options) {
            req.body.options = cleanOptions(req.body.options);
            if (!Array.isArray(req.body.options) || req.body.options.length === 0) {
                errors.options = 'Please add at least one option';
            }
        }
        
        if (Object.keys(errors).length) {
            res.status(400).json({ errors });
            return; 
        }
        next();
    }
    
    getPolls(req: Request, res: Response, next: NextFunction) {      
        if ('search' in req.query) {
            const searchString = req.query.search as string;
    
            if (validator.isEmpty(searchString, { ignore_whitespace: true })) {
                req.query.search = undefined;
            } else if (validator.isAlphanumeric(searchString, 'en-US', { ignore: ' ' })) {
                req.query.search = validator.escape(searchString.trim());
            } 
            else {
                req.query.search = undefined;
            }
        }

        if ('limit' in req.query) {
            if (!validator.isNumeric(req.query.limit as string)) {
                req.query.limit = undefined;
            }
        }
        
        if ('cursor' in req.query) {
            if (!validator.isMongoId(req.query.cursor as string)) {
                req.query.cursor = undefined;
            }
        }

        next();
    }
    
    isValidId(req: Request, res: Response, next: NextFunction) {        
        if (!validator.isMongoId(req.params.id)) {
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

        if (req.body.question && (typeof req.body.question !== 'string' || validator.isEmpty(req.body.question))) {
            errors.question = 'Question min length is 1';
        }

        if (!errors.options) {
            req.body.options = cleanOptions(req.body.options);
            if (!Array.isArray(req.body.options) || req.body.options.length === 0) {
                errors.options = 'Please add at least one option';
            }
        }

        if (Object.keys(errors).length) {
            res.status(400).json({ errors });
            return; 
        }

        next();
    }
}

export default new PollValidator();