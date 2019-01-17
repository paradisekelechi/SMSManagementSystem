import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import contacts from './contacts';
import messages from './messages';

dotenv.config();

const app = express();

app
  .use(bodyParser.urlencoded({
    extended: false,
  }))
  .use(bodyParser.text({
    type: 'text/html',
  }))
  .use(bodyParser.json({
    type: 'application/*+json',
  }))
  .use(bodyParser.json())
  .use(bodyParser.raw())
  .use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, user-token',
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });

app.use('/api/contacts', contacts);
app.use('/api/messages', messages);

export default app;
