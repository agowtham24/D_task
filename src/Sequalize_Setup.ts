import { Sequelize } from "sequelize";
import Config from "./config";

export const sequelizeInstance = new Sequelize(Config.DB_URL, {
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  retry: {
    max: 5, // Sequelize will retry up to 5 attempts
  },
});

let isDbConnected = false;

export const connectToDb = async () => {
  try {
    await sequelizeInstance.authenticate();
    console.log("Database connected successfully.");
    isDbConnected = true;
  } catch (error: any) {
    console.error("Database connection error:", error.message);
    isDbConnected = false;
    await handleDbReconnection();
  }
};

const handleDbReconnection = async () => {
  console.log("Attempting to reconnect to the database...");
  try {
    await sequelizeInstance.authenticate();
    console.log("Database reconnected successfully.");
    isDbConnected = true;
  } catch (error: any) {
    console.error("Reconnection attempt failed:", error.message);
    setTimeout(handleDbReconnection, 5000);
  }
};

export const getDbConnectionStatus = () => {
  return isDbConnected;
};
