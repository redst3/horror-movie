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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    usersService;
    jwtService;
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async createUser(input) {
        if (!input.name || !input.password) {
            throw new common_1.HttpException('Invalid username or password!', 400);
        }
        if (input.password.length < 8) {
            throw new common_1.HttpException('Password length is incorrect!', 400);
        }
        if (!/\d/.test(input.password)) {
            throw new common_1.HttpException('Password must contain a number!', 400);
        }
        const user = await this.usersService.findUserByName(input.name);
        if (user) {
            throw new common_1.HttpException('User already exists!', 400);
        }
        input.password = await bcrypt.hash(input.password, await bcrypt.genSalt());
        await this.usersService.create(input);
    }
    async validateUser(input) {
        if (!input.name || !input.password) {
            throw new common_1.HttpException('Invalid credentials!', 400);
        }
        const user = await this.usersService.findUserByName(input.name);
        if (!user) {
            throw new common_1.HttpException('User not found!', 400);
        }
        const isPasswordValid = await bcrypt.compare(input.password, user.password);
        if (isPasswordValid) {
            return { userId: user.id, name: user.name };
        }
        throw new common_1.HttpException('Wrong password or username!', 400);
    }
    async authenticateUser(input) {
        const user = await this.validateUser(input);
        return this.signInUser(user);
    }
    async signInUser(user) {
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
    async getUserFavorites(user) {
        if (!user) {
            throw new common_1.HttpException('User not found!', 400);
        }
        return await this.usersService.getUserFavorites(user.userId);
    }
    async addToUserFavorites(user, movieId) {
        if (!user) {
            throw new common_1.HttpException('User not found!', 400);
        }
        if (!movieId) {
            throw new common_1.HttpException('Movie id not found!', 400);
        }
        return await this.usersService.AddToUserFavorites(user.userId, movieId);
    }
    async removeFromUserFavorites(user, movieId) {
        if (!user) {
            throw new common_1.HttpException('User not found!', 400);
        }
        if (!movieId) {
            throw new common_1.HttpException('Movie id not found!', 400);
        }
        return await this.usersService.removeFromUserFavorites(user.userId, movieId);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map