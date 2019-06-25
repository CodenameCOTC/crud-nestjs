import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import * as Validator from 'validator';
import { Contact } from '../contact.entity'

interface Errors {
  firstName?: string
  lastName?: string
  phone?: string
  email?: string
  city?: string
  country?: string
}

interface validateCreateContact {
  errors?: Errors,
  isValid: boolean
}

@Injectable()
export class ValidateContactPipe implements PipeTransform {
  transform(value: Contact, metadata: ArgumentMetadata) {

    const { errors, isValid } = this.validateCreateContact(value);

    if (!isValid) throw new BadRequestException(errors)

    return value;
  }

  private validateCreateContact(value: Contact): validateCreateContact {
    let errors: Errors = {}

    const firstName = value.firstName ? value.firstName : ' ';
    const lastName = value.lastName ? value.lastName : ' ';
    const phone = value.phone ? value.phone : ' ';
    const email = value.email ? value.email : ' ';
    const city = value.city ? value.city : ' ';
    const country = value.country ? value.country : ' ';

    if (!Validator.isLength(firstName, { min: 2, max: 50 })) {
      errors.firstName = 'First Name length must be between 2 and 50'
    }

    if (Validator.isEmpty(firstName, { ignore_whitespace: true })) {
      errors.firstName = 'First Name cannot be empty'
    }

    if (!Validator.isLength(lastName, { min: 2, max: 50 })) {
      errors.lastName = 'Last Name length must be between 2 and 50'
    }

    if (Validator.isEmpty(lastName, { ignore_whitespace: true })) {
      errors.lastName = 'Last Name cannot be empty'
    }

    if (!Validator.isEmail(email)) {
      errors.email = 'Please insert a valid email address'
    }

    if (Validator.isEmpty(email, { ignore_whitespace: true })) {
      errors.email = 'Email cannot be empty'
    }


    if (!Validator.isMobilePhone(phone, 'id-ID')) {
      errors.phone = 'Please insert a valid phone number'
    }

    if (Validator.isEmpty(phone, { ignore_whitespace: true })) {
      errors.phone = 'Phone cannot be empty'
    }


    if (Validator.isEmpty(city, { ignore_whitespace: true })) {
      errors.city = 'City cannot be empty'
    }


    if (Validator.isEmpty(country, { ignore_whitespace: true })) {
      errors.country = 'Country cannot be empty'
    }

    return {
      errors,
      isValid: Object.keys(errors).length === 0
    }
  }
}
