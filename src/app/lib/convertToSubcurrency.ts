function convertToSubcurrency(amount: number, factor = 100) {
  return Math.floor(amount * factor);
}

export default convertToSubcurrency;
