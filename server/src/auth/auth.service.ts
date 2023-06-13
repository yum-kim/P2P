import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import { ResponseUserDto } from './dto/response-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialDto: AuthCredentialDto): Promise<any> {
    return this.userRepository.createUser(authCredentialDto);
  }

  async signIn(authCredentialDto: AuthCredentialDto): Promise<ResponseUserDto> {
    const { username, password } = authCredentialDto;
    const user = await this.userRepository.findOne({ where: { username } });

    if (user) {
      const passwordVerify = await bcrypt.compare(password, user.password);
      if (!passwordVerify)
        throw new UnauthorizedException('비밀번호가 맞지 않습니다');

      const payload: any = { username: user.username, id: user.id };
      const accessToken: string = await this.jwtService.sign(payload);
      return {
        accessToken,
        id: user.id,
        username: user.username,
        profileImagePath: user.profileImagePath,
      };
    } else {
      throw new UnauthorizedException('유저 정보가 존재하지 않습니다');
    }
  }
}
