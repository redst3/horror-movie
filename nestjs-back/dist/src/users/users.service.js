"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let UsersService = class UsersService {
    databaseService;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async create(createUser) {
        return this.databaseService.user.create({
            data: createUser,
        });
    }
    async findUserByName(name) {
        const foundUser = await this.databaseService.user.findFirst({
            where: {
                name: name,
            },
        });
        return foundUser;
    }
    async getUserFavorites(userId) {
        const foundUser = await this.databaseService.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!foundUser) {
            throw new common_1.HttpException('User not found!', 400);
        }
        return foundUser.favoriteMoviesIds;
    }
    async AddToUserFavorites(userId, movieId) {
        const foundUser = await this.databaseService.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!foundUser) {
            throw new common_1.HttpException('User not found!', 400);
        }
        if (foundUser.favoriteMoviesIds.includes(movieId)) {
            throw new common_1.HttpException('Movie already in favorites!', 400);
        }
        const foundMovie = await this.databaseService.movie.findUnique({
            where: {
                id: movieId,
            },
        });
        if (!foundMovie) {
            throw new common_1.HttpException('Movie does not exist!', 400);
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
    async removeFromUserFavorites(userId, movieId) {
        const foundUser = await this.databaseService.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!foundUser) {
            throw new common_1.HttpException('User not found!', 400);
        }
        if (!foundUser.favoriteMoviesIds.includes(movieId)) {
            throw new common_1.HttpException('Movie not found in favorites!', 400);
        }
        const foundMovie = await this.databaseService.movie.findUnique({
            where: {
                id: movieId,
            },
        });
        if (!foundMovie) {
            throw new common_1.HttpException('Movie does not exist!', 400);
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
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], UsersService);
//# sourceMappingURL=users.service.js.map