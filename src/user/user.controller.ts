import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport'
import { DeleteResult } from 'typeorm'
import { User } from './user.entity'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
    constructor(
        private UserService: UserService
    ) { }

    @Get()
    @UseGuards(AuthGuard())
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
