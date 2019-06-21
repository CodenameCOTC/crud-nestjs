import { Request as Req } from 'express'
import { User } from '../../user/user.entity'

export interface Request extends Req {
    user:  User
}