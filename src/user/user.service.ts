import { User } from './user.model';
import bcrypt from 'bcryptjs';

export const register = async ({
  firstName,
  lastName,
  email,
  password,
  birthDate,
  phone,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: string;
  phone: string;
}) => {
  const existing = await User.findOne({ $or: [{ email }, { phone }] });
  if (existing) {
    if (existing.email === email) throw new Error('Email already exists');
    if (existing.phone === phone) throw new Error('Phone already exists');
  }

  const user = new User({
    firstName,
    lastName,
    email,
    password,
    birthDate,
    phone,
  });
  const userDoc = await user.save();
  return userDoc.toObject();
};
