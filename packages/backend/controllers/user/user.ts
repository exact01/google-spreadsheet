import type { NextFunction, Request, Response } from 'express'
import { userService } from '@/service/users/users.service'
import { UserDTO } from '@/dtos/userDto'
async function getUserMe(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.myUser.id
        const user = await userService.getUserById({ id: userId })
        res.send(new UserDTO(user))
    } catch (e){
        next(e)
    }
}

export {
    getUserMe
}