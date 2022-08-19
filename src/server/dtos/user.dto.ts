// DTO for user creation
export class UserDto {
  name: string;
  mail: string;

  constructor(name: string, mail: string) {
    this.name = name;
    this.mail = mail;
  }
}
