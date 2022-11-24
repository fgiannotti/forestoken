// DTO for user get

export class AccreditationGetDto {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  typeOfWood: string;
  quantity: number;
  date: string; // no se usa pero es la fecha en la que se creó
  depositDate: string;
  phone: string;
  pathSaleContract: string;
  pathDeposit: string;
  pathComercialContract: string;
  state: string;
}
