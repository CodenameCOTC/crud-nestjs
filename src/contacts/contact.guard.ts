import { CanActivate, ExecutionContext, Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { Request } from './interface/request.interface'

@Injectable()
export class ContactGuard implements CanActivate {
  constructor(private readonly contactsService: ContactsService) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<any> {
    const request: Request = context.switchToHttp().getRequest();
    const contact = await this.contactsService.findOneById(request.params.id);

    if (!contact) throw new NotFoundException('Contact not found');

    if (contact.createdBy.id !== request.user.id) throw new ForbiddenException('Oops, why r u trying to delete someone else\'s contact?');

    return true
  }
}
