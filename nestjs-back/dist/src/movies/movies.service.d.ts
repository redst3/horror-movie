import { DatabaseService } from 'src/database/database.service';
export declare class MoviesService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    getAllMovies(): Promise<{
        id: number;
        title: string;
        description: string;
        photo_url: string;
        release_date: string;
        rating: number;
    }[]>;
    getMovieById(id: number): Promise<{
        id: number;
        title: string;
        description: string;
        photo_url: string;
        release_date: string;
        rating: number;
    }>;
}
