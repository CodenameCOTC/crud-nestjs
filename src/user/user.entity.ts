import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { ApiModelProperty } from '@nestjs/swagger'
import { Contact } from '../contacts/contact.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiModelProperty()
    @Column()
    email: string;

    @ApiModelProperty()
    @Column({select: false})
    password: string;

    @OneToMany(() => Contact, contacts => contacts.createdBy)
    contacts: Contact[]
}