export interface IPollData {
    created_at: number;
    updated_at: number;
    question: string;
    options: string[];
}
export interface IPoll extends IPollData {
    id: string;
}
