import type { IUserAttributesModel } from '@/databases/sequlize/models/User'
import type { Model } from 'sequelize-typescript'
import { IUserCreationAttributesModel } from '@/databases/sequlize/models/User/User'

class UserDTO {
    public readonly email: string
    public readonly id: number
    constructor(userDb: Model<IUserAttributesModel, IUserCreationAttributesModel>) {
        this.id = Number(userDb.dataValues.id)
        this.email = userDb.dataValues.email
    }
}

export default UserDTO