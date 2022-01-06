import { IsString } from 'class-validator';
import { Type } from 'class-transformer';

class LoginBody {
  @IsString()
  userAccountId: string;
  @IsString()
  signature: string;
}

export class LoginUserDto {
  @Type(() => LoginBody)
  data: LoginBody;
}