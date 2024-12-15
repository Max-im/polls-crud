import { MongoClient } from 'mongodb';

const url = process.env.DATABASE_URL as string;
const client = new MongoClient(url);

const dbName = 'pollsDb';

export async function connect() {
    await client.connect();
    return 'Database Connected successfully';
}


export const getClient = (collection: string) => {
    const db = client.db(dbName);
    return db.collection(collection);
};