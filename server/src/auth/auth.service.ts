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
      await this.checkPassword(password, user.password);
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

  async updateUser(
    updateUserDto: UpdateUserDto,
    file: Express.Multer.File,
    user: User,
  ): Promise<void> {
    let updateUser = {};
    const result: User = await this.userRepository.findOne({
      where: { id: user.id },
    });

    if (!result) throw new NotFoundException(`수정할 유저를 찾을 수 없습니다`);

    if (file) {
      if (result.profileImagePath) {
        await delete_image(result.profileImagePath);
      }
      await this.userRepository.updateUserImage(file, user.id);
    } else if (updateUserDto.password) {
      const hashedPassword = await this.userRepository.getHashPassword(
        updateUserDto.password,
      );
      updateUser = { password: hashedPassword, id: user.id };
      await this.userRepository.save(updateUser);
    } else {
      updateUser = { usercode: updateUserDto.usercode, id: user.id };
      await this.userRepository.save(updateUser);
    }
  }

  async deleteUser(user: User): Promise<void> {
    const result: User = await this.userRepository.findOne({
      where: { id: user.id },
    });

    if (result) {
      if (result.profileImagePath) await delete_image(result.profileImagePath);
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
}
