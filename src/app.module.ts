import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { RequestsModule } from './requests/requests.module'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    AuthModule,
    UserModule,
    RequestsModule,
    MongooseModule.forRoot(`mongodb+srv://akshat21:aku1985pika@cluster0.ew0oz.mongodb.net/sm?`),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
