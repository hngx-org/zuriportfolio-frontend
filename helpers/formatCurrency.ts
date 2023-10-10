// FUNCTION TO CONVERT STRING NUMs or NUMs to Nigerian Naira.
export const formatToNigerianNaira = (num: number | string): string => {
  // Convert input to a number
  const parsedNum = typeof num === 'string' ? parseFloat(num) : num;

  // Check if input is valid
  if (isNaN(parsedNum)) {
    throw new Error('Invalid input, please provide a number or a string of a number.');
  }
  // Format to Nigerian Naira currency format
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  });

  return formatter.format(parsedNum);
};
