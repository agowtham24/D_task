require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const Config = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV,
  DB_URL: process.env.DB_URL || "mysql://root:root@localhost:3306/users_task",
  API_PREFIX: process.env.API_PREFIX || "/api/v1/",
  JWT_SECRET: process.env.JWT_SECRET || "Naruto Uzumaki",
};

export default Config;
