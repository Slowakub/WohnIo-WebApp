import { Controller, Get, Post, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard) // Only authenticated users can access cart endpoints
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add/:productId')
  async addToCart(@Request() req, @Param('productId') productId: string) {
    const userId = req.user.userId;
    return this.cartService.addToCart(userId, productId);
  }

  @Get()
  async getCart(@Request() req) {
    const userId = req.user.userId;
    return this.cartService.getCart(userId);
  }

  @Delete('remove/:productId')
  async removeFromCart(@Request() req, @Param('productId') productId: string) {
    const userId = req.user.userId;
    return this.cartService.removeFromCart(userId, productId);
  }

  @Post('checkout')
  async checkout(@Request() req) {
    const userId = req.user.userId;
    await this.cartService.checkout(userId);
    return { message: 'Checkout completed successfully!' };
  }
}

