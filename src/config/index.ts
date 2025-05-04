import dotenv from 'dotenv';
dotenv.config();

export const config = {
  db: {
    dbUrl: process.env.MONGODB_URI || '',
    dbName: process.env.MONGODB_DATABASE || 'default_db_name',
  },
  jwt: {
    key: process.env.JWT_SECRET || 'default_jwt_secret',
  },
  ai: {
    key: process.env.OPENAI_API_KEY || '',
  },
};
