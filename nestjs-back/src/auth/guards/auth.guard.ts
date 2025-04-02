import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    const token = authorization?.split(' ')[1]; // splitting the token to remove the Bearer word
    if (!token) {
      throw new HttpException('Token not found!', 401);
    }

    try {
      const tokenPayload = await this.jwtService.verifyAsync(token);

      request.user = {
        userId: tokenPayload.sub,
        name: tokenPayload.name,
      };
      return true;
    } catch {
      throw new HttpException('Token is invalid or expired!', 401);
    }
  }
}
