import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import mongoosePaginate from 'mongoose-paginate-v2';
import validator from 'validator';

const UserSchema = new Schema(
  {
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email: string) => validator.isEmail(email),
        message: 'Invalid email format',
      },
    },
    passwordHash: { type: String, required: true },
    birthDate: { type: Date, required: true },
    resetPasswordToken: { type: String },
    phone: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      validate: {
        validator: (v) => /^[+0-9\s\-().]+$/.test(v),
        message: 'Invalid phone number format',
      },
    },
    gender: { type: String, enum: ['men', 'women'] },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
);

// Virtual for setting hashed password
UserSchema.virtual('password').set(function (plainPassword: string): void {
  if (plainPassword) {
    this.set('passwordHash', bcrypt.hashSync(plainPassword, 12));
  }
});

UserSchema.plugin(mongoosePaginate);

const CUSTOM_COLLECTION_NAME = process.env.USER_COLLECTION || 'users';

const User = mongoose.model('User', UserSchema, CUSTOM_COLLECTION_NAME) || mongoose.models.Customer;

export { User };
