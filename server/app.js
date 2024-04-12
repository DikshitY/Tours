import helmet from 'helmet';
import express from 'express';
import cors from 'cors';
import postRoutes from './routes/posts.routes.js';
import userRoutes from './routes/users.routes.js';
import fileUpload from 'express-fileupload';

const app = express();

app.use(cors());
app.use(helmet());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Tours APIs.');
});

app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/users', userRoutes);

app.all('*', (req, res, next) => {
  res.status(404).send(`Can't find ${req.originalUrl} on this server.`, 404);
});

export default app;
