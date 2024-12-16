import { ObjectId } from "mongodb";
import { ParsedQs } from "qs";
import { getClient } from "../db";
import { IGetPollsResponse, IPoll, IPollData, PollDocument, SearchQuery } from "./polls.type";
import { IMessage, SuccessMessage, ErrorMessage, NotFoundMessage } from "../messages";
import ResponsePollDto from "./dto/responsePoll.dto";

class PollsRepository {
    private get client() {
        const collection = 'polls';
        return getClient(collection);
    }

    private getIPoll(poll: PollDocument) {
        return new ResponsePollDto({
            id: poll._id.toString(),
            question: poll.question,
            options: poll.options,
            created_at: poll.created_at,
            updated_at: poll.updated_at
        });
    }

    async create(dto: IPollData): Promise<IMessage<IPoll>> {
        try {
            const response = await this.client.insertOne({ ...dto });
            const payload = new ResponsePollDto({ ...dto, id: response.insertedId.toString() });
            return new SuccessMessage<IPoll>(payload, 201);
        } catch (e) {
            console.log(e);
            return new ErrorMessage('Error while creating poll');
        }
    }

    async getAll(queries: ParsedQs): Promise<IMessage<IGetPollsResponse>> {
        try {
            const searchQuery: SearchQuery = {};

            if (queries.search) {
                searchQuery.question = { $regex: queries.search as string, $options: 'i' };
            }

            const defaultLimit = 10;
            const limit = queries.limit ? parseInt(queries.limit as string, 10) : defaultLimit;

            if (queries.cursor) {
                searchQuery._id = { $gt: new ObjectId(queries.cursor as string) };
            }

            const result = await this.client
                .find<PollDocument>(searchQuery)
                .sort({ _id: 1 })
                .limit(limit)
                .toArray();

            const polls = result.map((poll) => this.getIPoll(poll));
            const nextCursor = result.length > 0 ? result[result.length - 1]._id : null;

            return new SuccessMessage<IGetPollsResponse>({ polls, nextCursor });
        } catch (e) {
            console.log(e);
            return new ErrorMessage('Error while getting poll');
        }
    }

    async getItem(id: string): Promise<IMessage<IPoll>> {
        try {
            const result = await this.client.findOne<PollDocument>({ _id: new ObjectId(id) });
            if (!result) {
                return new NotFoundMessage('Poll not found');
            }

            const poll = this.getIPoll(result);
            return new SuccessMessage<IPoll>(poll);
        } catch (e) {
            console.log(e);
            return new ErrorMessage('Error while getting the poll');
        }
    }

    async update(dto: Omit<IPoll, 'created_at'>): Promise<IMessage<IPoll>> {
        try {
            const toUpdate = { updated_at: dto.updated_at, question: dto.question, options: dto.options };
            const result = await this.client.findOneAndUpdate({ _id: new ObjectId(dto.id) }, { $set: toUpdate }, { returnDocument: 'after' }) as PollDocument | null;

            if (!result) {
                return new NotFoundMessage('Poll not found');
            }
            const response = this.getIPoll(result);
            return new SuccessMessage<IPoll>(response, 200);
        } catch (e) {
            console.log(e);
            return new ErrorMessage('Error while updating the poll');
        }
    }

    async delete(id: string): Promise<IMessage<{ success: boolean }>> {
        try {
            const result = await this.client.findOneAndDelete({ _id: new ObjectId(id) });
            if (!result) {
                return new NotFoundMessage('Poll not found');
            }
            return new SuccessMessage<{ success: boolean }>({ success: true });
        } catch (e) {
            console.log(e);
            return new ErrorMessage('Error while delete the poll');
        }
    }
}

export default new PollsRepository();