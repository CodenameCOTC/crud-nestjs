import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'
import {ApiModelProperty} from '@nestjs/swagger'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiModelProperty()
    @Column()
    email: string;

    @ApiModelProperty()
    @Column()
    password: string;
}