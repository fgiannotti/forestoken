// DTO for user creation

export class AccreditationDto {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  typeOfWood: string;
  quantity: number;
  date: string = new Date().toLocaleString('es-AR');
  depositDate: string = new Date().toLocaleString('es-AR');
  phone: string;
  pathSaleContract: string;
  pathDeposit: string;
  pathComercialContract: string;
}
