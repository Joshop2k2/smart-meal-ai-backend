import { Request, Response, NextFunction } from 'express';

import { getUserById } from '@/user/user.service';
import jwt from 'jsonwebtoken';

export const checkUserExists = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token =
    typeof authHeader === 'string' && authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : null;
  const { userId } = req.params;

  if (!token) {
    return res.status(401).json({ error: 'Authorization token is required' });
  }

  if (!userId) {
    return res.status(400).json({ error: 'UserId is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      email: string;
    };

    if (decoded.id !== userId) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
