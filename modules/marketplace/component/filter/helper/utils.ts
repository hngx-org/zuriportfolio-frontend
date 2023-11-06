export const formatToNigerianNaira = (num: number | string): string => {
    // Convert input to a number
    const parsedNum = typeof num === 'string' ? parseFloat(num) : num;
  
    // Format to Nigerian Naira currency format
    const formatter = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    });
  
    return formatter.format(parsedNum);
  };