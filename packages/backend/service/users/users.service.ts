import { User } from '@/databases/sequlize/init'
import { ICreateUser, IGetUserByEmail, IGetUserById } from '@/service/users/users.interfaces'
import { ConflictError } from '@/errors/Conflict'
import { Forbidden } from '@/errors/Forbidden'

export class UserService {
    public async getUserByEmail({ email }: IGetUserByEmail){
        return User.findOne({ where: { email } })
    }

    public async getUserById({ id }: IGetUserById){
        const user = await User.findOne({ where: { id } })
        if (!user){
            throw new Forbidden()
        }
        return user
    }

    public async createUser({ email, hashPassword }: ICreateUser){
        const isHaveUser = await this.getUserByEmail({ email })
        if (isHaveUser){
            throw new ConflictError()
        }
        return User.create({ email, password: hashPassword })
    }
}

export const userService = new UserService()