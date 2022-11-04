import { Controller, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { Types } from 'mongoose'
import Auth from 'src/auth/decorators/Auth.decorator'
import { ReqUser } from 'src/auth/decorators/ReqUser.decorator'
import { UserDocument } from 'src/models/user.model'
import { ParseObjectId } from 'src/utils/pipes/ParseObjectId.pipe'
import { CanAccessRequest } from './guards/CanAccessRequest.guard'
import { RequestsService } from './requests.service'

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post('new')
  @Auth({ user: true })
  @UseGuards(new CanAccessRequest())
  async httpCreateNewRequest(@Query('to', ParseObjectId) id: Types.ObjectId, @ReqUser() user: UserDocument) {
    const request = await this.requestsService.createNewRequest(user, id)
    return { success: true, message: 'Request sent successfully', request }
  }

  @Patch()
  @Auth({ user: true })
  @UseGuards(new CanAccessRequest())
  async httpAccpetRequest(@Query('id', ParseObjectId) id: Types.ObjectId, @ReqUser() user: UserDocument) {
    const request = await this.requestsService.accept(user, id)
    return { success: true, message: 'Request accepted successfully', request }
  }

  @Patch()
  @Auth({ user: true })
  @UseGuards(new CanAccessRequest())
  async httpDenyRequest(@Query('id', ParseObjectId) id: Types.ObjectId) {
    const request = await this.requestsService.deny(id)
    return { success: true, message: 'Request denied successfully', request }
  }
}
