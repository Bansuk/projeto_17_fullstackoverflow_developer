import express from 'express';
import cors from 'cors';

import questionRouter from './routers/questionRouter';
import serverMiddlewareError from './middlewares/serverMiddlewareError';

const app = express();

app.use(express.json());
app.use(cors());

app.use(questionRouter);

app.use(serverMiddlewareError);

export default app;
