import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { UserContacts } from '@prisma/client';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    contacts: UserContacts[]
    contacts_as_user: UserContacts[]
}
