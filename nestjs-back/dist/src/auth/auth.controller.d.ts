import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(input: {
        name: string;
        password: string;
    }): Promise<{
        accessToken: string;
        userId: number;
        name: string;
        favoriteMovies: number[];
    }>;
    register(input: {
        name: string;
        password: string;
    }): Promise<void>;
    getUserFavorites(request: {
        user: {
            userId: number;
        };
    }): Promise<number[]>;
    addToUserFavorites(input: {
        movieId: number;
    }, request: {
        user: {
            userId: number;
        };
    }): Promise<number[]>;
    removeFromUserFavorites(input: {
        movieId: number;
    }, request: {
        user: {
            userId: number;
        };
    }): Promise<number[]>;
}
