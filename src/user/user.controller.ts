import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { DeleteResult } from 'typeorm'
import { User } from './user.entity'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
    constructor(
        private UserService: UserService
    ) { }

    @Get()
    findAll(): Promise<User[]> {
        return this.UserService.findAll()
    }

    @Post()
    create(@Body() userData: User): Promise<User> {
        return this.UserService.create(userData);
    }

    @Delete("/:id")
    delete(@Param() id): Promise<DeleteResult> {
        return this.UserService.delete(id);
    }
}
