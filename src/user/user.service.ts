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
    if (existing.email === email) throw new Error('Email đã tồn tại');
    if (existing.phone === phone) throw new Error('Số điện thoại đã tồn tại');
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

export const login = async ({ email, password }: { email: string; password: string }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Email hoặc mật khẩu không hợp lệ');
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    throw new Error('Email hoặc mật khẩu không hợp lệ');
  }

  return user.toObject();
};
