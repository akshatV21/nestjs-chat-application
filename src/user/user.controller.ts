import { Controller, Get } from '@nestjs/common'
import Auth from 'src/auth/decorators/Auth.decorator'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Auth()
  async getUser() {}
}
