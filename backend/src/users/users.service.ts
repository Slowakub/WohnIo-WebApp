import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';



@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Find user by email
  async findByEmail(email: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ email }).exec(); // Find user by email
  }

  // Create new user with hashed password
  async create(userDto: any): Promise<UserDocument> {
    const existingUser = await this.userModel.findOne({ email: userDto.email });
  if (existingUser) {
    throw new BadRequestException('User with this email already exists');
  }
    const hashedPassword = await bcrypt.hash(userDto.password, 10); // Hash password
    const newUser = new this.userModel({
      email: userDto.email,
      password: hashedPassword,
      role: userDto.role || 'user',
    });
    return newUser.save(); // Save the new user in the database
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-password').exec(); // Find all users and exclude password
  }

}
