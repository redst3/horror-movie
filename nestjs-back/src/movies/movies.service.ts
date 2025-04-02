import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class MoviesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllMovies() {
    return this.databaseService.movie.findMany();
  }
  async getMovieById(id: number) {
    const foundMovie = await this.databaseService.movie.findUnique({
      where: {
        id: id,
      },
    });
    if (!foundMovie) throw new HttpException('Movie could not be found!', 400);
    return foundMovie;
  }
}
