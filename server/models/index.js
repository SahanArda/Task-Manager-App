import Sequelize from "sequelize";
import sequelize from "../config/database.js";
import task from "./task.js";
import user from "./user.js";

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Task = task(sequelize, Sequelize);
db.User = user(sequelize, Sequelize);

export default db;
