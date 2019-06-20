import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { ApiModelProperty } from '@nestjs/swagger';

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
    country: String
}