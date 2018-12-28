import dotenv from 'dotenv';
import Logger from './utils/logger';
import app from './routes';

dotenv.config();

const port = process.env.PORT || 4000;
app.set('port', port);

app.get('*', (req, res) => {
  res.status(200).send({
    message: 'Base route for population management application',
    success: true,
  });
});

app.listen(port, () => {
  Logger('info', `Population management application started and running on port ${port}`);
});

export default app;
