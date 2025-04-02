import { DatabaseService } from '../database/database.service';
import { Prisma } from '@prisma/client';
export declare class UsersService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    create(createUser: Prisma.UserCreateInput): Promise<{
        id: number;
        name: string;
        password: string;
        favoriteMoviesIds: number[];
    }>;
    findUserByName(name: string): Promise<{
        id: number;
        name: string;
        password: string;
        favoriteMoviesIds: number[];
    } | null>;
    getUserFavorites(userId: number): Promise<number[]>;
    AddToUserFavorites(userId: number, movieId: number): Promise<number[]>;
    removeFromUserFavorites(userId: number, movieId: number): Promise<number[]>;
}
