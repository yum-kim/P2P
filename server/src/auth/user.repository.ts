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
    const { username, password } = authCredentialDto;

    const salt: any = await bcrypt.genSalt();
    const hashedPassword: any = await bcrypt.hash(password, salt);
    const user = this.create({
      username,
      password: hashedPassword,
      usercode: '',
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
}
