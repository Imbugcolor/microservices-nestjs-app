import { IsEmail, IsString } from 'class-validator';

export class NotifyEmailDto {
  @IsEmail()
  email: string;

  @IsString()
  txt: string;
}
