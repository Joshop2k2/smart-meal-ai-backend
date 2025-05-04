import app from '@/app';
import { connectDB } from './config/db';
import cors from 'cors';

const PORT = process.env.PORT || 4000;

// Allow all origins
app.use(cors({ origin: 'http://localhost:3000' }));

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
