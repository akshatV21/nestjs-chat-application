import { IsNotEmpty, IsEmail } from '@nestjs/class-validator'

export class RegisterPayload {
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  password: string
}
