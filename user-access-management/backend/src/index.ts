import express from 'express';
import "reflect-metadata";
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import authRoutes from '../new-backend/src/routes/authRoutes';
import softwareRoutes from '../new-backend/src/routes/softwareRoutes';
import requestRoutes from '../new-backend/src/routes/requestRoutes';
import { authMiddleware } from '../new-backend/src/middlewares/authMiddleware';
import cors from 'cors';
import "reflect-metadata"


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [__dirname + '/entities/*.ts']
});

AppDataSource.initialize().then(() => {
  console.log('Database connected');

  app.use('/api/auth', authRoutes);
  app.use('/api/software', authMiddleware, softwareRoutes);
  app.use('/api/requests', authMiddleware, requestRoutes);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

}).catch(err => console.error(err));

export { AppDataSource };