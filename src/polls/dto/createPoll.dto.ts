import { toUnixTimestamp } from "../../utils";
import { IPollData } from "../polls.type";

export default class CreatePollDto implements IPollData {
    created_at: number;
    updated_at: number;
    question: string;
    options: string[];

    constructor(data: any) {
        this.question = data.question;
        this.options = data.options;
        this.created_at = toUnixTimestamp();
        this.updated_at = toUnixTimestamp();
    }
}