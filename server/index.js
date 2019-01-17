import dotenv from 'dotenv';
import Logger from './utils/logger';
import app from './routes';

dotenv.config();

const port = process.env.PORT || 4000;
app.set('port', port);

app.get('*', (req, res) => {
  res.status(200).send({
    message: 'Base route for SMS management application',
    success: true,
  });
});

app.listen(port, () => {
  Logger('info', `SMS management application started and running on port ${port}`);
});

export default app;
