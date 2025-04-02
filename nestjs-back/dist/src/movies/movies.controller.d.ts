import { MoviesService } from './movies.service';
export declare class MoviesController {
    private readonly moviesService;
    constructor(moviesService: MoviesService);
    getAllMovies(): Promise<{
        id: number;
        title: string;
        description: string;
        photo_url: string;
        release_date: string;
        rating: number;
    }[]>;
    getMovieById(id: string): Promise<{
        id: number;
        title: string;
        description: string;
        photo_url: string;
        release_date: string;
        rating: number;
    }>;
}
