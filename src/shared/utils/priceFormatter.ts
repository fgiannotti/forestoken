export const toPriceableString = (
  amount: number,
  withSymbol = false,
): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    maximumFractionDigits: 5,
    /* 2500  --> $2,500.00 */
    /* 2500.1  --> $2,500.10 */
  });

  const amountFormatted = formatter.format(amount);

  return withSymbol ? '$ ' + amountFormatted : amountFormatted;
};
