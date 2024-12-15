import 'dotenv/config';
import express from 'express';
import pollsRouter from './polls';
import { connect } from './db';
import { NOT_FOUND_MSG } from './constants';

async function getApplication() {
    const app = express();

    await connect()
        .then(console.log)
        .catch(console.error);

    app.use(express.json());
    app.use(pollsRouter);

    app.all('*', (req, res) => {
        res.status(404).json({ message: NOT_FOUND_MSG });
    });

    return app;
}

export default getApplication;