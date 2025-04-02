import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(input: { name: string; password: string }) {
    if (!input.name || !input.password) {
      throw new HttpException('Invalid username or password!', 400);
    }
    if (input.password.length < 8) {
      throw new HttpException('Password length is incorrect!', 400);
    }
    if (!/\d/.test(input.password)) {
      throw new HttpException('Password must contain a number!', 400);
    }
    const user = await this.usersService.findUserByName(input.name);
    if (user) {
      throw new HttpException('User already exists!', 400);
    }
    input.password = await bcrypt.hash(input.password, await bcrypt.genSalt());
    await this.usersService.create(input);
  }

  async validateUser(input: { name: string; password: string }) {
    if (!input.name || !input.password) {
      throw new HttpException('Invalid credentials!', 400);
    }
    const user = await this.usersService.findUserByName(input.name);
    if (!user) {
      throw new HttpException('User not found!', 400);
    }
    const isPasswordValid = await bcrypt.compare(input.password, user.password);
    if (isPasswordValid) {
      return { userId: user.id, name: user.name };
    }

    throw new HttpException('Wrong password or username!', 400);
  }

  async authenticateUser(input: { name: string; password: string }) {
    const user = await this.validateUser(input);
    return this.signInUser(user);
  }

  async signInUser(user: { userId: number; name: string }) {
    const tokenPayload = {
      sub: user.userId,
      name: user.name,
    };
    const accessToken = await this.jwtService.signAsync(tokenPayload);
    const favoriteMovies = await this.getUserFavorites(user);

    return {
      accessToken,
      userId: user.userId,
      name: user.name,
      favoriteMovies,
    };
  }
  async getUserFavorites(user: { userId: number }) {
    if (!user) {
      throw new HttpException('User not found!', 400);
    }
    return await this.usersService.getUserFavorites(user.userId);
  }
  async addToUserFavorites(user: { userId: number }, movieId: number) {
    if (!user) {
      throw new HttpException('User not found!', 400);
    }
    if (!movieId) {
      throw new HttpException('Movie id not found!', 400);
    }
    return await this.usersService.AddToUserFavorites(user.userId, movieId);
  }

  async removeFromUserFavorites(user: { userId: number }, movieId: number) {
    if (!user) {
      throw new HttpException('User not found!', 400);
    }
    if (!movieId) {
      throw new HttpException('Movie id not found!', 400);
    }
    return await this.usersService.removeFromUserFavorites(
      user.userId,
      movieId,
    );
  }
}
