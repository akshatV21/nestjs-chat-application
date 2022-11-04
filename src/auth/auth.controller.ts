import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { CanAccessRequest } from 'src/requests/guards/CanAccessRequest.guard'
import { AuthService } from './auth.service'
import Auth from './decorators/Auth.decorator'
import { LoginPayload } from './dtos/LoginPayload.dto'
import { RegisterPayload } from './dtos/RegisterPayload.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Auth({ isOpen: true })
  @UsePipes(new ValidationPipe())
  async httpRegisterUser(@Body() registerPayload: RegisterPayload) {
    const user = await this.authService.register(registerPayload)
    return { success: true, message: 'User registered successfully', user }
  }

  @Post('login')
  @Auth({ isOpen: true })
  @UsePipes(new ValidationPipe())
  async httpLoginUser(@Body() loginPayload: LoginPayload) {
    const user = await this.authService.login(loginPayload)
    return { success: true, message: 'User logged in successfully', user }
  }
}
