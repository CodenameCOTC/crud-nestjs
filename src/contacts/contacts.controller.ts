import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Contact } from './contact.entity'
import { ContactsService } from './contacts.service'
import { ApiUseTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from './interface/request.interface'

@ApiUseTags('Contact')
@Controller('contacts')
export class ContactsController {
    constructor(private ContactsService: ContactsService) { }

    @Get()
    @UseGuards(AuthGuard())
    @ApiOperation({ title: 'Get all current user contact' })
    @ApiBearerAuth()
    index(@Req() request: Request): Promise<Contact[]> {
        return this.ContactsService.findAll(request);
    }

    @Post('create')
    @UseGuards(AuthGuard())
    @ApiOperation({ title: 'Create contact' })
    @ApiBearerAuth()
    async create(@Req() request: Request, @Body() contactData: Contact): Promise<any> {
        return this.ContactsService.create(request.user, contactData);
    }

    @Put(':id/update')
    @UseGuards(AuthGuard())
    @ApiOperation({ title: 'Update contact' })
    @ApiBearerAuth()
    async update(@Param('id') id, @Body() contactData: Contact): Promise<any> {
        contactData.id = Number(id);
        return this.ContactsService.update(contactData);
    }

    @Delete(':id/delete')
    @UseGuards(AuthGuard())
    @ApiOperation({ title: 'Delete contact by id' })
    @ApiBearerAuth()
    async delete(@Param('id') id): Promise<any> {
        return this.ContactsService.delete(id)
    }
}
