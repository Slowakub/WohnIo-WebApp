import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getProfile(user: any): any{
    return {
      message: "User Profile",
      userId: user._id,
      email: user.email,
      role: user.role,
    }
  }
}
