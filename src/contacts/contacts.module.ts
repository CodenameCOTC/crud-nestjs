import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { Contact } from './contact.entity'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    TypeOrmModule.forFeature([Contact])
  ],
  providers: [ContactsService],
  controllers: [ContactsController]
})
export class ContactsModule { }
