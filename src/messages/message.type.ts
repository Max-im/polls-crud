export interface IMessage {
    payload: Record<string, unknown> | string | number | boolean | null;
    error: boolean;
    code: number;
}
