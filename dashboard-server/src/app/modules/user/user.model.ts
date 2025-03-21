import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt';
import config from "../../config";
import { IUser } from "./user.interface";
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
  
userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this; 
  
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    );
  
    next();
});
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};


export const User = model<IUser>('User', userSchema);