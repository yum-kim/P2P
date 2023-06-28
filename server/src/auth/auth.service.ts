import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import { ResponseUserDto } from './dto/response-user.dto';
import { User } from './user.entity';
import { delete_image } from 'src/aws/s3.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as config from 'config';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async findOneUser(userId: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id: userId } });
  }

  async signUp(authCredentialDto: AuthCredentialDto): Promise<any> {
    if (!authCredentialDto.usercode)
      authCredentialDto.usercode = this.generateUserCode();
    return this.userRepository.createUser(authCredentialDto);
  }

  async signIn(
    authCredentialDto: AuthCredentialDto,
    res,
  ): Promise<ResponseUserDto> {
    const jwtConfig = config.get('jwt');
    const { username, password } = authCredentialDto;
    const user = await this.userRepository.findOne({ where: { username } });

    if (user) {
      await this.checkPassword(password, user.password);
      const payload: any = { username: user.username, id: user.id };
      const accessToken: string = await this.generateToken(
        payload,
        jwtConfig.secret,
        jwtConfig.expiresIn,
      );
      const refreshToken: string = await this.generateToken(
        payload,
        jwtConfig.refresh,
        jwtConfig.refreshExpiresIn,
      );
      return {
        accessToken,
        refreshToken,
        id: user.id,
        username: user.username,
        usercode: user.usercode,
        profileImagePath: user.profileImagePath,
      };
    } else {
      throw new UnauthorizedException('유저 정보가 존재하지 않습니다');
    }
  }

  async updateUser(
    updateUserDto: UpdateUserDto,
    file: Express.Multer.File,
    user: User,
  ): Promise<User> {
    let updateUser = {};
    const result: User = await this.userRepository.findOne({
      where: { id: user.id },
    });

    if (!result) throw new NotFoundException(`수정할 유저를 찾을 수 없습니다`);

    if (file) {
      if (result.profileImageName) {
        await delete_image(result.profileImageName);
      }
      return await this.userRepository.updateUserImage(file, user.id);
    } else if (updateUserDto.password) {
      const hashedPassword = await this.userRepository.getHashPassword(
        updateUserDto.password,
      );
      updateUser = { password: hashedPassword, id: user.id };
    } else {
      updateUser = { usercode: updateUserDto.usercode, id: user.id };
    }
    return await this.userRepository.save(updateUser);
  }

  async deleteUserProfile(user: User): Promise<User> {
    const updateUser = {
      profileImagePath: null,
      profileImageName: null,
      id: user.id,
    };
    const result: User = await this.userRepository.findOne({
      where: { id: user.id },
    });

    if (result) {
      if (result.profileImageName) await delete_image(result.profileImageName);
      return await this.userRepository.save(updateUser);
    } else {
      throw new NotFoundException(`삭제할 유저를 찾을 수 없습니다`);
    }
  }

  async deleteUser(user: User): Promise<void> {
    const result: User = await this.userRepository.findOne({
      where: { id: user.id },
    });

    if (result) {
      if (result.profileImageName) await delete_image(result.profileImageName);
      await this.userRepository.delete(result.id);
    } else {
      throw new NotFoundException(`삭제할 유저를 찾을 수 없습니다`);
    }
  }

  async checkPassword(password, oriPassword) {
    const passwordVerify = await bcrypt.compare(password, oriPassword);
    if (!passwordVerify)
      throw new UnauthorizedException('비밀번호가 맞지 않습니다');
  }

  generateUserCode() {
    const colors = [
      '빨간',
      '파란',
      '노란',
      '푸른',
      '하얀',
      '분홍',
      '까만',
      '초록',
    ];
    const items = [
      '자동차',
      '사과',
      '비행기',
      '오토바이',
      '배',
      '선풍기',
      '가방',
      '베개',
    ];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomItem = items[Math.floor(Math.random() * items.length)];

    return randomColor + randomItem;
  }

  async generateToken(payload, secretKey, expiresIn?): Promise<string> {
    return await this.jwtService.sign(payload, {
      secret: secretKey,
      expiresIn,
    });
  }
}
