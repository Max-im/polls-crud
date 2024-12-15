import { toUnixTimestamp } from "../../utils";
import { IPoll } from "../polls.type";

export default class UpdatePollDto implements Omit<IPoll, 'created_at'> {
    id: string;
    updated_at: number;
    question: string;
    options: string[];

    constructor(id: string, data: IPoll) {
        this.id = id;
        this.question = data.question;
        this.options = data.options;
        this.updated_at = toUnixTimestamp();
    }
}