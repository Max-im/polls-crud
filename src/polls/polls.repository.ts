import { IPoll, IPollData } from "./polls.type";
import { getClient } from "../db";
import { IMessage, SuccessMessage, ErrorMessage, NotFoundMessage } from "../messages";
import { ParsedQs } from "qs";
import ResponsePollDto from "./dto/responsePoll.dto";
import { ObjectId } from "mongodb";

class PollsRepository {
    private get client() {
        const collection = 'polls';
        return getClient(collection);
    }

    async create(dto: IPollData): Promise<IMessage> {
        try {
            const response = await this.client.insertOne({...dto});
            const payload = new ResponsePollDto({ ...dto, id: response.insertedId.toString() });
            return new SuccessMessage<IPoll>(payload, 201);
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

            const defaultLimit = 2
            const limit = queries.limit ? parseInt(queries.limit as string, 10) : defaultLimit;

            if (queries.cursor) {
                searchQuery._id = { $gt: new ObjectId(queries.cursor as string) };
            }    

            const result = await this.client
                .find(searchQuery)
                .sort({ _id: 1 })
                .limit(limit)
                .toArray();

            const payload = result.map((poll) => new ResponsePollDto({ 
                id: poll._id.toString(),
                question: poll.question,
                options: poll.options,
                created_at: poll.created_at,
                updated_at: poll.updated_at 
            }));

            const nextCursor = result.length > 0 ? result[result.length - 1]._id : null;


            return new SuccessMessage<{polls: IPoll[], nextCursor: ObjectId | null}>({polls: payload, nextCursor});
        } catch (e) {
            console.log(e);
            return new ErrorMessage('Error while getting poll');
        }
    }

    async getItem(id: string): Promise<IMessage> {
        try {
            const result = await this.client.findOne({ _id: new ObjectId(id) });
            if (!result) {
                return new NotFoundMessage('Poll not found');
            }

            const dto = new ResponsePollDto({
                id: result._id.toString(),
                question: result.question,
                options: result.options,
                created_at: result.created_at,
                updated_at: result.updated_at
            });
            return new SuccessMessage<IPoll>(dto);
        } catch (e) {
            console.log(e);
            return new ErrorMessage('Error while getting the poll');
        }
    }

    async update(dto: Omit<IPoll, 'created_at'>): Promise<IMessage> {
        try {
            const toUpdate = { updated_at: dto.updated_at, question: dto.question, options: dto.options };
            const result = await this.client.findOneAndUpdate({ _id: new ObjectId(dto.id) }, { $set: toUpdate }, { returnDocument: 'after' });

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
            const result = await this.client.findOneAndDelete({ _id: new ObjectId(id) });
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