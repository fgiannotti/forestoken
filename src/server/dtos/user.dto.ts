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

export class UserDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsEmail({}, { message: 'Email is not valid' })
  mail: string;

  @IsNumberString({ no_symbols: true }, { message: 'Dni is not valid' })
  dni: string;

  // es case sensitive, si le llega en minúscula tira error.
  @IsIn(['Empresa', 'Individuo'], { message: 'TipoProductor is not valid' })
  tipoProductor: string;

  @IsNotEmpty({ message: 'Provincia is required' })
  provincia: string;

  @IsNotEmpty({ message: 'Ciudad is required' })
  ciudad: string;

  @IsNotEmpty({ message: 'address is required' })
  address: string;

  @IsPostalCode('AU', {message: 'zipCode is not valid'})
  zipCode: string;

  @IsIn(['Monotributista', 'Responsable Inscripto', 'Consumidor Final'], { message: 'taxSubjectType is not valid' })
  taxSubjectType: enum?;

  @IsBoolean({ message: 'isPoliticPerson is not valid' })
  isPoliticPerson: boolean;

  @IsBoolean({ message: 'isRegulatedPerson is not valid' })
  isRegulatedPerson: boolean;

  @IsDateString({ message: 'dateOfBirth is not valid' })
  dateOfBirth: Date;

  @IsUrl({ message: 'photoUrl is not valid' })
  photoUrl: string;
}
