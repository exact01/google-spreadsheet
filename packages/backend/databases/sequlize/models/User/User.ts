import type { Model } from 'sequelize-typescript'
import { DataType } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'
import { Optional } from 'sequelize'

export interface IUserAttributesModel {
    id: bigint
    email: string
    password: string
    role: 'user' | 'admin' | 'moderator'
    createdAt: Date | number
    updatedAt?: Date | number
}

export type IUserCreationAttributesModel = Optional<IUserAttributesModel, 'createdAt' | 'updatedAt' | 'id' | 'role' >

export const userModel: ModelAttributes<Model<IUserAttributesModel, IUserCreationAttributesModel>, IUserAttributesModel> = {
    id: {
        type: DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataType.STRING,
        allowNull: true,
        unique: true,
    },
    password: {
        type: DataType.STRING,
        defaultValue: null,
    },
    role: {
        type: DataType.STRING,
        defaultValue: 'user',
    },
    createdAt: DataType.DATE,
    updatedAt: DataType.DATE,
}