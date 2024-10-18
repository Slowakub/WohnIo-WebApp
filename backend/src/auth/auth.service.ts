import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class AuthService {
    constructor(
      private usersService: UsersService,
      private jwtService: JwtService,
    ) {}
  
    async validateUser(email: string, password: string): Promise<{ email: string, role: string } | null> {
      const user = await this.usersService.findByEmail(email);
      if (user && await bcrypt.compare(password, user.password)) {
        return {
          email: user.email,
          role: user.role,
        };
      }
      return null;
      
    }
  
    async login(user: any) {
      console.log('User object in login:', user); // Debug log
      const payload = { email: user.email, sub: user._id, role: user.role };
      return {
        access_token: this.jwtService.sign(payload),
        user: {
          userId: user._id,   
          email: user.email,     
          role: user.role,        
        }
      };  
    }
  
    async register(userDto: any) {
      return this.usersService.create(userDto);
    }
  }
