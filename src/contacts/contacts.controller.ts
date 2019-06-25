import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req, UsePipes, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Contact } from './contact.entity'
import { ContactsService } from './contacts.service'
import { ContactGuard } from './contact.guard'
import { Request } from './interface/request.interface'
import { ValidateContactPipe } from './pipe/validate-contact-dto'

@ApiUseTags('Contact')
@Controller('contacts')
export class ContactsController {
    constructor(private ContactsService: ContactsService) { }

    @Get()
    @UseGuards(AuthGuard())
    @ApiOperation({ title: 'Get all current user contact' })
    @ApiBearerAuth()
    index(@Req() request: Request, @Query() query: { page: number, limit: number }): Promise<Contact[]> {
        return this.ContactsService.findAll(request, query.limit, query.page);
    }

    @Post()
    @UseGuards(AuthGuard())
    @UsePipes(new ValidateContactPipe())
    @ApiOperation({ title: 'Create contact' })
    @ApiBearerAuth()
    async create(@Req() request: Request, @Body() contactData: Contact): Promise<any> {
        return this.ContactsService.create(request.user, contactData);
    }

    @Put(':id')
    @UseGuards(AuthGuard())
    @UsePipes(new ValidateContactPipe())
    @ApiOperation({ title: 'Update contact' })
    @ApiBearerAuth()
    async update(@Param('id') id, @Body() contactData: Contact): Promise<any> {
        contactData.id = Number(id);
        return this.ContactsService.update(contactData);
    }

    @Delete(':id')
    @UseGuards(AuthGuard(), ContactGuard)
    @ApiOperation({ title: 'Delete contact by id' })
    @ApiBearerAuth()
    async delete(@Param('id') id): Promise<any> {
        return this.ContactsService.delete(id)
    }

}
