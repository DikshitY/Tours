import helmet from 'helmet';
import express from 'express';
import cors from 'cors';
import postsRouter from './routes/posts.routes.js';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

app.get('/', (req, res) => {
  res.send('Welcome to the Tours APIs.');
});

app.use('/api/v1/posts', postsRouter);

app.all('*', (req, res, next) => {
  next(new Error(`Can't find ${req.originalUrl} on this server.`, 404));
});

export default app;
