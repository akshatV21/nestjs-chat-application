import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { WebSocketServer } from '@nestjs/websockets'
import { Model, Types } from 'mongoose'
import { Request, RequestDocument } from 'src/models/request.model'
import { User, UserDocument } from 'src/models/user.model'
import { REQUEST_STATUS } from 'src/utils/constants'
import { Server } from 'socket.io'

@Injectable()
export class RequestsService {
  @WebSocketServer()
  server: Server

  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
    @InjectModel(Request.name) private readonly RequestModel: Model<RequestDocument>,
  ) {}

  async createNewRequest(user: UserDocument, id: Types.ObjectId) {
    const request = new this.RequestModel({ from: user._id, to: id })
    const reqSentToUser = await this.UserModel.findById(id)

    user.requestsSent.push(request._id)
    reqSentToUser.requestsRecieved.push(request._id)

    await Promise.all([request.save(), user.save(), reqSentToUser.save()])
    // this.server.of('/requests').to(request.to.toString()).emit('new_request', request)
    return request
  }

  async accept(user: UserDocument, id: Types.ObjectId) {
    const request = await this.RequestModel.findById(id)
    if (request.status !== REQUEST_STATUS.UNANSWERED) throw new BadRequestException('Request was already processed')

    const userToAdd = await this.UserModel.findById(request.from)

    user.friends.push(userToAdd._id)
    userToAdd.friends.push(user._id)
    request.status = REQUEST_STATUS.ACCEPTED

    await Promise.all([request.save(), user.save(), userToAdd.save()])
    return request
  }

  async deny(id: Types.ObjectId) {
    const request = await this.RequestModel.findById(id)
    if (request.status !== REQUEST_STATUS.UNANSWERED) throw new BadRequestException('Request was already processed')

    request.status = REQUEST_STATUS.ACCEPTED
    await request.save()
    return request
  }
}
