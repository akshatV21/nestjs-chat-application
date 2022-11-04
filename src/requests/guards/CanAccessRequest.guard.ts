import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { REQUEST_ACTIONS } from 'src/utils/constants'

@Injectable()
export class CanAccessRequest implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const action = String(request.path).substring(1)
    const user = request.user
    const requestId = request.query.id

    let idExists: boolean

    if (action === REQUEST_ACTIONS.ACCEPT || action === REQUEST_ACTIONS.DENY) {
      idExists = user.requestsRecieved.includes(requestId)
    } else {
      idExists = user.requestsSent.includes(requestId)
    }

    if (!idExists) throw new ForbiddenException('You are unauthorized to complete this action')
    return true
  }
}
