import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import * as Validator from 'validator';
import { User } from '../user.entity';

interface Errors {
  email?: string
  password?: string
}

interface ValidateUserDTO {
  errors?: Errors,
  isValid: boolean
}

@Injectable()
export class ValidateUserPipe implements PipeTransform {
  transform(value: User, metadata: ArgumentMetadata) {
    const { errors, isValid } = this.validateUserDTO(value);


    if (!isValid) throw new BadRequestException(errors)

    return value;
  }

  private validateUserDTO(user: User): ValidateUserDTO {
    let errors: Errors = {}
    const email = user.email ? user.email : ' ';
    const password = user.password ? user.password : ' ';

    if (!Validator.isEmail(email)) {
      errors.email = 'Please insert a valid email address'
    }

    if (Validator.isEmpty(email, { ignore_whitespace: true })) {
      errors.email = 'Email cannot be empty'
    }

    if (!Validator.isLength(password, { min: 6, max: 12 })) {
      errors.password = 'Password length must be between 6 and 12'
    }

    if (Validator.isEmpty(password, { ignore_whitespace: true })) {
      errors.password = 'Password cannot be empty'
    }

    return {
      errors,
      isValid: Object.keys(errors).length === 0
    }

  }
}
