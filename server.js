const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection is successfull');
  });

const app = require('./app');

// eslint-disable-next-line no-multi-assign
const port = (process.env.PORT = 4000 || 3000);

app.listen(port, () => console.log('http://localhost:4000/'));
