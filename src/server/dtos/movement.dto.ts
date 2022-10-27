// DTO for movement creation
export class MovementDto {
  userId: number;
  description: string;
  burned: boolean;
  amount: number;
  powrId: number;
  date: Date;
}
