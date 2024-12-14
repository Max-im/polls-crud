import { INTERNAL_ERROR_MSG } from "../constants";
import { IMessage } from "./message.type";

export class ErrorMessage implements IMessage {
    payload: {message: string};
    error = true;
    code = 500;

    constructor(message: string = INTERNAL_ERROR_MSG, code: number = 500) {
        this.payload = {message};
        this.code = code;
    }
}