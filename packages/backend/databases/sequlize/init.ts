import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import {
    POSTGRES_DB,
    POSTGRES_PASSWORD,
    POSTGRES_PORT,
    POSTGRES_USER,
    POSTGRES_IP_ADDRESS
} from '@/utils/constants'

import { userModel } from './models/User'

const sequelizeOptions: SequelizeOptions = {
    host: POSTGRES_IP_ADDRESS,
    port: Number(POSTGRES_PORT),
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    dialect: 'postgres', // 'mysql', 'sqlite', 'mariadb', 'mssql'
    dialectOptions: {
        supportBigNumbers: true,
        raw :true,
    },
    logging: false, // отключаем логирование в console!
}

export const sequelize = new Sequelize(sequelizeOptions)

export const User = sequelize
    .define('user', userModel, { timestamps: true })

export async function dbConnect() {
    try {
        await sequelize.authenticate()
        await sequelize.sync({ alter: true, force: false })
        console.log('Postgres: connection has been established successfully!')
    } catch (error) {
        console.error('Unable to connect to the databases:', error)
        await dbConnect()
    }
}