export const toPriceableString = (
  amount: number,
  withSymbol = false,
): string => {
  //sugerido por copilot, no pregunten JAJA
  const amountFormatted = amount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return withSymbol ? '$ ' + amountFormatted : amountFormatted;
};
