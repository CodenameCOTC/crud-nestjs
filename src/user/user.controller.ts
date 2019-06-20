import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm'
import { User } from './user.entity'
import { UserService } from './user.service'

@ApiUseTags('User')
@Controller('user')
export class UserController {
    constructor(
        private UserService: UserService
    ) { }

    @Get()
    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    @ApiOperation({ title: 'Get all users' })
    findAll(): Promise<User[]> {
        return this.UserService.findAll()
    }

    @ApiOperation({ title: 'Registering user' })
    @Post()
    create(@Body() userData: User): Promise<User> {
        return this.UserService.create(userData);
    }

    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    @ApiOperation({ title: 'Delete user by id' })
    @Delete("/:id")
    delete(@Param() id): Promise<DeleteResult> {
        return this.UserService.delete(id);
    }
}
