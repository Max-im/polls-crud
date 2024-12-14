import { IPoll } from "./polls.type";
import { getClient } from "../db";
import { IMessage, SuccessMessage, ErrorMessage, NotFoundMessage } from "../messages";
import { ParsedQs } from "qs";

class PollsRepository {
    private get client() {
        const collection = 'polls';
        return getClient(collection);
    }

    async create(dto: IPoll): Promise<IMessage> {
        try {
            await this.client.insertOne(dto);
            return new SuccessMessage<IPoll>(dto, 201);
        } catch (e) {
            console.log(e);
            return new ErrorMessage('Error while creating poll');
        }
    }

    async getAll(queries: ParsedQs): Promise<IMessage> {
        try {
            const searchQuery: {[key: string]: any} = {};
            if (queries.search) {
                searchQuery.question = { $regex: queries.search, $options: 'i' };
            }
            const result = await this.client.find(searchQuery).toArray();
            return new SuccessMessage<typeof result>(result);
        } catch (e) {
            console.log(e);
            return new ErrorMessage('Error while getting poll');
        }
    }

    async getItem(id: string): Promise<IMessage> {
        try {
            const result = await this.client.findOne({ id });
            if (!result) {
                return new NotFoundMessage('Poll not found');
            }
            return new SuccessMessage<typeof result>(result);
        } catch (e) {
            console.log(e);
            return new ErrorMessage('Error while getting the poll');
        }
    }

    async update(dto: Omit<IPoll, 'created_at'>): Promise<IMessage> {
        try {
            const toUpdate = { updated_at: dto.updated_at, question: dto.question, options: dto.options };
            const result = await this.client.findOneAndUpdate({ id: dto.id }, { $set: toUpdate }, { returnDocument: 'after' });

            if (!result) {
                return new NotFoundMessage('Poll not found');
            }
            return new SuccessMessage<typeof result>(result, 200);
        } catch (e) {
            console.log(e);
            return new ErrorMessage('Error while updating the poll');
        }
    }

    async delete(id: string): Promise<IMessage> {
        try {
            const result = await this.client.findOneAndDelete({ id });
            if (!result) {
                return new NotFoundMessage('Poll not found');
            }
            return new SuccessMessage<{success: boolean}>({success: true});
        } catch (e) {
            console.log(e);
            return new ErrorMessage('Error while delete the poll');
        }
    }
}

export default new PollsRepository();