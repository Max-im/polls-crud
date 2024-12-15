import { ObjectId } from 'mongodb';
import { ParsedQs } from 'qs';

export interface IPollData {
    created_at: number;
    updated_at: number;
    question: string;
    options: string[];
}
export interface IPoll extends IPollData {
    id: string;
}

export interface QueryParams extends ParsedQs {
    search?: string;
    limit?: string;
    cursor?: string;
}

export interface SearchQuery {
    question?: {
        $regex?: string | RegExp;
        $options?: string;
    };
    _id?: {
        $gt?: ObjectId;
    };
}