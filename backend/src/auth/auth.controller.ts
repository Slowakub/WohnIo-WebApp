import { Controller, Post, Body, Request, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  
  @Post('login')
  async login(@Body() req) {
    if (!req.email || !req.password) {
      throw new BadRequestException("Email or password not provided");
  }
  const user = await this.authService.validateUser(req.email, req.password);
  if (!user) {
      throw new UnauthorizedException('Invalid credentials');
  }

  return this.authService.login(user);
  }
  

  @Post('register')
  async register(@Body() req) {
    return this.authService.register(req);
  }
}
