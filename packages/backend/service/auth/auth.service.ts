import { AUTH_ERRORS, AuthError } from '@/errors/AuthError'
import { compare, hash } from 'bcrypt'
import { UserService, userService } from '@/service/users/users.service'
import { JwtService, jwtService } from '@/service/jwt'
import { IAuthUser } from '@/service/auth/auth.interfaces'
import { IAccessToken } from '@/service/jwt/interfeces'
import { SALT } from '@/utils/constants'

class AuthService {
    private readonly userService: UserService
    private readonly jwtService: JwtService
    constructor() {
        this.userService = userService
        this.jwtService = jwtService
    }
    public async signIn({ email, password }: IAuthUser): Promise<IAccessToken>{
        const user = await this.userService.getUserByEmail({ email })
        if (!user){
            throw new AuthError(AUTH_ERRORS.INVALID_LOGIN_OR_PASSWORD)
        }
        const isPassEquals: boolean = await compare(password, user.dataValues.password)

        if (!isPassEquals){
            throw new AuthError(AUTH_ERRORS.INVALID_LOGIN_OR_PASSWORD)
        }

        return this.jwtService.generateAccessToken({ id: String(user.dataValues.id) })
    }

    public async signUp({ email, password }: IAuthUser): Promise<IAccessToken>{
        const hashPassword = await hash(password, Number(SALT))
        const newUser = await this.userService.createUser({ email, hashPassword })
        return this.jwtService.generateAccessToken({ id: String(newUser.dataValues.id) })
    }

}

export const authService = new AuthService()