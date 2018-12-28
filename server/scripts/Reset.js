import db from '../models/index';
import Logger from '../utils/logger';

const { sequelize } = db;
sequelize.sync({ force: true })
  .then(() => {
    Logger('info', 'Database forcefully reset');
    process.exit(0);
  });
