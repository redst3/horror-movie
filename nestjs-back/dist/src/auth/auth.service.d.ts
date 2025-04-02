import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    createUser(input: {
        name: string;
        password: string;
    }): Promise<void>;
    validateUser(input: {
        name: string;
        password: string;
    }): Promise<{
        userId: number;
        name: string;
    }>;
    authenticateUser(input: {
        name: string;
        password: string;
    }): Promise<{
        accessToken: string;
        userId: number;
        name: string;
        favoriteMovies: number[];
    }>;
    signInUser(user: {
        userId: number;
        name: string;
    }): Promise<{
        accessToken: string;
        userId: number;
        name: string;
        favoriteMovies: number[];
    }>;
    getUserFavorites(user: {
        userId: number;
    }): Promise<number[]>;
    addToUserFavorites(user: {
        userId: number;
    }, movieId: number): Promise<number[]>;
    removeFromUserFavorites(user: {
        userId: number;
    }, movieId: number): Promise<number[]>;
}
