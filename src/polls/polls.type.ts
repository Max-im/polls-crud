export interface IPoll {
    id: string;
    created_at: number;
    updated_at: number;
    question: string;
    options: string[];
}
