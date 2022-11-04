import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { hashSync } from 'bcrypt'
import { Document } from 'mongoose'
import { Request } from './request.model'

export type UserDocument = User & Document

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  username: string

  @Prop({ required: true })
  email: string

  @Prop({ required: true })
  password: string

  @Prop()
  avatar: string

  @Prop({ default: [], ref: 'Chat' })
  chats: []

  @Prop({ default: [], ref: 'User' })
  friends: User[]

  @Prop({ default: [], ref: 'Request' })
  requestsSent: Request[]

  @Prop({ default: [], ref: 'Request' })
  requestsRecieved: Request[]

  @Prop({ default: [], ref: 'Tale' })
  tales: []

  _doc: any
}

const UserSchema = SchemaFactory.createForClass(User)

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()

  const hashedPassword = hashSync(this.password, 4)
  this.password = hashedPassword
  return next()
})

export { UserSchema }
