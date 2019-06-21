import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async findAll(): Promise<User[]> {
        return this.userRepository.find({ select: ["email", 'id'], relations: ['contacts'] });
    }

    async create(user: User): Promise<User> {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        return this.userRepository.save(user);
    }

    async delete(id: number): Promise<DeleteResult> {
        return this.userRepository.delete(id);
    }

    async findOneByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({ email }, {select: ['email', 'id', 'password']})
    }
}
