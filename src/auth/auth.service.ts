import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { compareSync } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { Model } from 'mongoose'
import { User, UserDocument } from 'src/models/user.model'
import { LoginPayload } from './dtos/LoginPayload.dto'
import { RegisterPayload } from './dtos/RegisterPayload.dto'

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private readonly UserModel: Model<UserDocument>) {}

  async register(registerPayload: RegisterPayload) {
    const user = new this.UserModel(registerPayload)
    await user.save()

    const { password, ...rest } = user._doc
    return rest
  }

  async login(loginPayload: LoginPayload) {
    const registeredUser = await this.UserModel.findOne({ username: loginPayload.username })
    if (!registeredUser) throw new BadRequestException('User does not exists')

    const passwordMatches = compareSync(loginPayload.password, registeredUser.password)
    if (!passwordMatches) throw new BadRequestException('Invalid password')

    const token = sign(registeredUser.id, 'akshat')
    const { password, ...rest } = registeredUser._doc
    return { ...rest, token }
  }

  async getUser(id: string) {
    const user = await this.UserModel.findById(id)
    if (!user) throw new BadRequestException('User does not exists')
    return user
  }
}
