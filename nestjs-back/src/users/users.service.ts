import { Injectable, HttpException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUser: Prisma.UserCreateInput) {
    return this.databaseService.user.create({
      data: createUser,
    });
  }

  async findUserByName(name: string) {
    const foundUser = await this.databaseService.user.findFirst({
      where: {
        name: name,
      },
    });
    return foundUser;
  }

  async getUserFavorites(userId: number) {
    const foundUser = await this.databaseService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!foundUser) {
      throw new HttpException('User not found!', 400);
    }
    return foundUser.favoriteMoviesIds;
  }

  async AddToUserFavorites(userId: number, movieId: number) {
    const foundUser = await this.databaseService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!foundUser) {
      throw new HttpException('User not found!', 400);
    }
    if (foundUser.favoriteMoviesIds.includes(movieId)) {
      throw new HttpException('Movie already in favorites!', 400);
    }
    const foundMovie = await this.databaseService.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    if (!foundMovie) {
      throw new HttpException('Movie does not exist!', 400);
    }
    const user = await this.databaseService.user.update({
      where: {
        id: userId,
      },
      data: {
        favoriteMoviesIds: {
          push: movieId,
        },
      },
    });

    return user.favoriteMoviesIds;
  }
  async removeFromUserFavorites(userId: number, movieId: number) {
    const foundUser = await this.databaseService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!foundUser) {
      throw new HttpException('User not found!', 400);
    }
    if (!foundUser.favoriteMoviesIds.includes(movieId)) {
      throw new HttpException('Movie not found in favorites!', 400);
    }
    const foundMovie = await this.databaseService.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    if (!foundMovie) {
      throw new HttpException('Movie does not exist!', 400);
    }

    const user = await this.databaseService.user.update({
      where: {
        id: userId,
      },
      data: {
        favoriteMoviesIds: {
          set: foundUser.favoriteMoviesIds.filter((id) => id !== movieId),
        },
      },
    });

    return user.favoriteMoviesIds;
  }
}
