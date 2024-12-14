import { MongoClient } from 'mongodb';

const url = `mongodb+srv://max-im:mNrpaf9ZCHGkFSkU@polls.tv7k8.mongodb.net/`;
const client = new MongoClient(url);

const dbName = 'pollsDb';

export async function connect() {
    await client.connect();
    return 'Connected successfully to server';
}


export const getClient = (collection: string) => {
    const db = client.db(dbName);
    return db.collection(collection);
};