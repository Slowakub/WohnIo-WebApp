import { Controller, Post, Body, Get, Param, UseGuards, Req, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findUserByEmail(@Query('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard) 
  @Get('all')
  async findAllUsers() {
    return this.usersService.findAll();
  }
}
