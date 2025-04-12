import { Request, Response } from 'express';
import * as userService from './user.service';
import jwt from 'jsonwebtoken';
import { config } from '../config';

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, birthDate, phone } = req.body;

    const user = await userService.register({
      firstName,
      lastName,
      email,
      password,
      birthDate,
      phone,
    });

    const { passwordHash, ...userWithoutPasswordHash } = user;

    res.status(201).json({ message: 'Registered', user: userWithoutPasswordHash });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userService.login({ email, password });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const { passwordHash, ...userWithoutPasswordHash } = user;

    const token = jwt.sign({ id: user._id, email: user.email }, config.jwt.key as jwt.Secret, {
      expiresIn: '30d',
    });

    res.status(200).json({ message: 'Logged in', data: { user: userWithoutPasswordHash, token } });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};
