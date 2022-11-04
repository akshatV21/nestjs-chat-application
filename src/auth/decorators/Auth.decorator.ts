import { SetMetadata } from '@nestjs/common'
import { AuthOptions } from '../utils/types'

const Auth = (option: AuthOptions = {}) => {
  const metadata = {
    isOpen: option.isOpen ?? false,
    user: option.user ?? false,
  }
  return SetMetadata('authOptions', metadata)
}

export default Auth
