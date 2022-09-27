// DTO for user creation
import {
  IsNotEmpty,
  IsEmail,
  IsIn,
  IsBoolean,
  IsNumberString,
  IsUrl,
  IsDateString,
  IsPostalCode,
} from 'class-validator';
import { ProducerType } from '../entities/producerType.enum';
import { TaxSubjectType } from '../entities/taxSubjectType.enum';

export class UserDto {
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @IsEmail({}, { message: 'email is not valid' })
  mail: string;

  @IsNumberString({ no_symbols: true }, { message: 'dni is not valid' })
  dni: string;

  // es case sensitive, si le llega en minúscula tira error.
  @IsIn(['Empresa', 'Individuo'], { message: 'producer type is not valid' })
  producerType: ProducerType;

  @IsNotEmpty({ message: 'Provincia is required' })
  provincia: string;

  @IsNotEmpty({ message: 'city is required' })
  city: string;

  @IsNotEmpty({ message: 'address is required' })
  address: string;

  @IsPostalCode('AU', {message: 'postal code is not valid'})
  postalCode: string;

  @IsIn(['Monotributista', 'Responsable Inscripto', 'Consumidor Final'], { message: 'tax subject type is not valid' })
  taxSubjectType: TaxSubjectType;

  @IsBoolean({ message: 'is politic person is not valid' })
  isPoliticPerson: boolean;

  @IsBoolean({ message: 'is regulated person is not valid' })
  isRegulatedPerson: boolean;

  @IsDateString({ message: 'date of birth is not valid' })
  dateOfBirth: Date;

  @IsUrl({ message: 'photo url is not valid' })
  photoUrl: string;
}
