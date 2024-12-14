import { IPoll } from "../polls.type";

export default class ResponsePollDto implements IPoll {
    id: string;
    created_at: number;
    updated_at: number;
    question: string;
    options: string[];
    
    constructor(poll: IPoll) {
        this.id = poll.id;
        this.created_at = poll.created_at;
        this.updated_at = poll.updated_at;
        this.question = poll.question;
        this.options = poll.options;
    }
}