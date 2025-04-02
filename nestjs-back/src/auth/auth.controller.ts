import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  HttpException,
  Post,
  Get,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() input: { name: string; password: string }) {
    if (
      !input ||
      typeof input.name !== 'string' ||
      typeof input.password !== 'string'
    )
      throw new HttpException('Invalid name or password!', 400);

    return this.authService.authenticateUser(input);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() input: { name: string; password: string }) {
    if (
      !input ||
      typeof input.name !== 'string' ||
      typeof input.password !== 'string'
    )
      throw new HttpException('Invalid name or password!', 400);
    return this.authService.createUser(input);
  }

  @UseGuards(AuthGuard)
  @Get('favorites')
  getUserFavorites(@Request() request: { user: { userId: number } }) {
    return this.authService.getUserFavorites(request.user);
  }

  @UseGuards(AuthGuard)
  @Patch('favorites/add')
  addToUserFavorites(
    @Body() input: { movieId: number },
    @Request() request: { user: { userId: number } },
  ) {
    if (!input || typeof input.movieId !== 'number')
      throw new HttpException('Invalid movie id!', 400);

    return this.authService.addToUserFavorites(request.user, input.movieId);
  }

  @UseGuards(AuthGuard)
  @Patch('favorites/remove')
  removeFromUserFavorites(
    @Body() input: { movieId: number },
    @Request() request: { user: { userId: number } },
  ) {
    if (!input || typeof input.movieId !== 'number')
      throw new HttpException('Invalid movie id!', 400);

    return this.authService.removeFromUserFavorites(
      request.user,
      input.movieId,
    );
  }
}
