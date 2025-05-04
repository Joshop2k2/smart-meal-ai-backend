import express from 'express';
import userRoutes from '@/user/user.route';
import mealRoutes from '@/meal/meal.route';
import cors from 'cors';

const app = express();

app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/meals', mealRoutes);

export default app;
