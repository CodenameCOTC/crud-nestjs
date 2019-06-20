import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import {Contact} from './contact.entity'
import {ContactsService} from './contacts.service'
import { identity } from 'rxjs';

@Controller('contacts')
export class ContactsController {
    constructor(private ContactsService: ContactsService) {}

    @Get()
    index(): Promise<Contact[]> {
        return this.ContactsService.findAll();
    }

    @Post('create')
    async create(@Body() contactData: Contact): Promise<any> {
        return this.ContactsService.create(contactData);
    }

    @Put(':id/update')
    async update(@Param('id') id, @Body() contactData: Contact): Promise<any> {
        contactData.id = Number(id);
        console.log('Update #' + contactData.id);
        return this.ContactsService.update(contactData);
    }

    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
        return this.ContactsService.delete(id)
    }
}
