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

  @IsNotEmpty({ message: 'Direccion is required' })
  direccion: string;

  @IsPostalCode('AU', {message: 'CodigoPostal is not valid'})
  codigoPostal: string;

  @IsIn(['Monotributista', 'Responsable Inscripto', 'Consumidor Final'], { message: 'CondicionIva is not valid' })
  responsableTributo: string;

  @IsBoolean({ message: 'PersonaPolitica is not valid' })
  personaPolitica: boolean;

  @IsBoolean({ message: 'PersonaRegulada is not valid' })
  personaRegulada: boolean;

  @IsDateString({ message: 'FechaNacimiento is not valid' })
  fechaNacimiento: Date;

  @IsUrl({ message: 'Url is not valid' })
  urlFoto: string;
}
