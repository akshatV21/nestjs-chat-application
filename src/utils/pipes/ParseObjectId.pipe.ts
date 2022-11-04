import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common'
import { Types } from 'mongoose'

@Injectable()
export class ParseObjectId implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): Types.ObjectId {
    return new Types.ObjectId(value)
  }
}
