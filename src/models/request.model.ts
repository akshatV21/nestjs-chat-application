import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { REQUEST_STATUS } from 'src/utils/constants'

export type RequestDocument = Request & Document

@Schema({ timestamps: true })
export class Request {
  @Prop({ required: true, ref: 'User' })
  from: Types.ObjectId

  @Prop({ required: true, ref: 'User' })
  to: Types.ObjectId

  @Prop({ default: REQUEST_STATUS.UNANSWERED })
  status: string
}

export const RequestSchema = SchemaFactory.createForClass(Request)
