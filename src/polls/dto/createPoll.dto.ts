import { toUnixTimestamp } from "../../utils";
import { createId } from "../../utils";
import { IPoll } from "../polls.type";

export default class CreatePollDto implements IPoll {
    id: string;
    created_at: number;
    updated_at: number;
    question: string;
    options: string[];

    constructor(data: any) {
        this.id = createId();
        this.question = data.question;
        this.options = data.options;
        this.created_at = toUnixTimestamp();
        this.updated_at = toUnixTimestamp();
    }
}