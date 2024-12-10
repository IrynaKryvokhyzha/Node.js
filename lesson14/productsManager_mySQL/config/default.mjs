import dotenv from "dotenv";
dotenv.config();
export default Object.freeze({
  db: {
    type: process.env.DB_TYPE,
    mongo: {
      databaseName: process.env.MONGODB_DATABASE_NAME,
      databaseUrl: process.env.MONGODB_URL,
      mongoURI: `${process.env.MONGODB_URL}${process.env.MONGODB_DATABASE_NAME}`,
    },
    mysql: {
      host: process.env.SQL_HOST,
      user: process.env.SQL_USER,
      password: process.env.SQL_PASSWORD,
      database: process.env.SQL_DATABASE,
    },
  },
  port: process.env.PORT,
  secretKey: process.env.SECRET_KEY,
});
