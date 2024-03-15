import 'dotenv/config';
import app from './app.js';
import mongoose from 'mongoose';

const Port = process.env.PORT || 3000;

const URL = process.env.DATABASE_URL.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(URL)
  .then(() =>
    app.listen(Port, () => {
        console.log(`Server is running on port ${Port}`);
    })
  )
  .catch((error) => console.log('Unable to connect to the database', error.message));
