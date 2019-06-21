import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn } from 'typeorm'
import { ApiModelProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity'

@Entity()
export class Contact {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiModelProperty()
    @Column()
    firstName: string;

    @ApiModelProperty()
    @Column()
    lastName: string;

    @ApiModelProperty()
    @Column()
    email: string;

    @ApiModelProperty()
    @Column()
    phone: string;

    @ApiModelProperty()
    @Column()
    city: string;

    @ApiModelProperty()
    @Column()
    country: string

    @ManyToOne(() => User, user => user.contacts)
    createdBy: User
}