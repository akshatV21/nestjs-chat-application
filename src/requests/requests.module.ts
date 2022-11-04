import { Module } from '@nestjs/common'
import { RequestsService } from './requests.service'
import { RequestsController } from './requests.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from 'src/models/user.model'
import { Request, RequestSchema } from 'src/models/request.model'
import { RequestsGateway } from './requests.gateway'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Request.name, schema: RequestSchema },
    ]),
  ],
  controllers: [RequestsController],
  providers: [RequestsService, RequestsGateway],
})
export class RequestsModule {}
