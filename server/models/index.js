import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import configObject from '../utils/config';

const databaseConfiguration = configObject[process.env.NODE_ENV];
const basename = path.basename(module.filename);
const db = {};
let sequelize;

if (databaseConfiguration.use_env_variable) {
  sequelize = new Sequelize(databaseConfiguration.use_env_variable, {
    pool: {
      max: 10,
      min: 0,
      idle: 1000,
    },
  });
} else {
  const { database, username, password } = databaseConfiguration;
  sequelize = new Sequelize(database, username, password, databaseConfiguration);
}

fs
  .readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
