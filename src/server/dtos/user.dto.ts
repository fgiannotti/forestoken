// DTO for user creation
import {
  IsNotEmpty,
  IsEmail,
  IsIn,
  IsBoolean,
  IsNumberString,
  IsIdentityCard,
  IsUrl,
  IsDate,
  IsPostalCode,
} from 'class-validator';

export class UserDto {
  name: string;

  @IsEmail({}, { message: 'Email is not valid' })
  mail: string;

  //@IsNotEmpty({ message: 'Dni is required' })
  //@IsNumberString({no_symbols: true,  })
  dni: string;

  //@IsIn(['empresa', 'individuo', 'Empresa', 'Individuo'], {   message: 'TipoProductor is not valid',  })
  tipoProductor: string;

  provincia: string;

  ciudad: string;

  direccion: string;

  //@IsNumberString( { no_symbols: true,    },    { message: 'CodigoPostal is not valid' },  )
  //@IsPostalCode('AU')
  codigoPostal: string;

  //@IsIn(['Monotributista', 'Responsable Inscripto', 'Consumidor Final'], {    message: 'CondicionIva is not valid',  })
  responableTributo: string;

  //@IsBoolean({ message: 'PersonaPolitica is not valid' })
  personaPolitica: boolean;

  ////@IsBoolean({ message: 'PersonaRegulada is not valid' })
  personaRegulada: boolean;

  //@IsDate({ message: 'FechaNacimiento is not valid' })
  fechaNacimiento: Date;

  ////@IsUrl({}, { message: 'Url is not valid' })
  urlFoto: string;
}
