export class PaymentDto {
  amount_to_pay: number;
  tokens_consumed: number;
  affiliate_id: string;
  user_id: number | null = 1;
}
