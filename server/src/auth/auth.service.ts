import { Injectable } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async signUp(authCredentialDto: AuthCredentialDto): Promise<any> {
    return this.userRepository.createUser(authCredentialDto);
  }
}
