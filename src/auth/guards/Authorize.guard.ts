import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { verify } from 'jsonwebtoken'
import { AuthService } from '../auth.service'
import { AuthOptions } from '../utils/types'

@Injectable()
export class Authorize implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { isOpen, user } = this.reflector.get<AuthOptions>('authOptions', context.getHandler())
    if (isOpen) return true

    const request = context.switchToHttp().getRequest()
    const authHeader = request.headers['auhtorization']
    if (!authHeader) throw new UnauthorizedException('Please log in first!')

    const token = authHeader.split(' ')[1]
    const id = this.verifyToken(token)

    if (user) {
      request.user = await this.authService.getUser(id)
    } else {
      request.user = id
    }
    return true
  }

  private verifyToken(token: string): any {
    return verify(token, 'akshat', (err, id) => {
      if (err) throw new BadRequestException('Inavlid auth token')
      return id
    })
  }
}
