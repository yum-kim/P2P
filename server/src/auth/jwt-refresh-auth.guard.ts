import {
  Injectable,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import * as config from 'config';

@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard('jwt-refresh') {
  constructor(private jwtService: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const refreshToken = request.cookies['refreshToken'];

    if (refreshToken === undefined) {
      throw new HttpException('Token 전송 안됨', HttpStatus.UNAUTHORIZED);
    }

    request.user = await this.validateToken(refreshToken);
    return true;
  }

  async validateToken(token: string) {
    const secretKey = config.get('jwt.refresh');

    try {
      const verify = await this.jwtService.verify(token, { secret: secretKey });
      return verify;
    } catch (e) {
      switch (e.name) {
        // 토큰에 대한 오류를 판단합니다.
        case 'JsonWebTokenError':
          throw new HttpException('유효하지 않은 토큰입니다.', 401);
        case 'TokenExpiredError':
          throw new HttpException('토큰이 만료되었습니다.', 401);
        default:
          throw new HttpException('서버 오류입니다.', 500);
      }
    }
  }
}
