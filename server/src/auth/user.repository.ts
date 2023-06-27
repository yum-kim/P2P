import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CustomRepository } from 'src/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialDto: AuthCredentialDto): Promise<any> {
    const { username, password, usercode } = authCredentialDto;

    const hashedPassword = await this.getHashPassword(password);
    const user = this.create({
      username,
      password: hashedPassword,
      usercode: usercode,
    });
    try {
      return await this.save(user);
    } catch (e) {
      // unique Error
      if (e.code === '23505') {
        throw new ConflictException('Existing username');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateUserImage(file: any, userId: number): Promise<User> {
    const { location, key } = file.transforms[0];

    const UserImage = this.create({
      profileImagePath: location,
      profileImageName: key,
      id: userId,
    });
    return await this.save(UserImage);
  }

  async getHashPassword(password: string): Promise<string> {
    const salt: any = await bcrypt.genSalt();
    const hashedPassword: any = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
}
