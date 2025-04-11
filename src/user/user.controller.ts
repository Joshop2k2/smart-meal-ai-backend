import { Request, Response } from 'express';
import * as userService from './user.service';

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
