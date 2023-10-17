export const checkObjectProperties = (
  obj: Record<string, any>,
): { allChecksPassed: boolean; failedChecks: string[] } => {
  const failedChecks: string[] = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (
        value === '' || // Check for an empty string
        (Array.isArray(value) && value.length === 0) || // Check for an empty array
        (typeof value === 'object' && Object.keys(value).length === 0) || // Check for an empty object
        value === null || // Check for null
        value === undefined // Check for undefined
      ) {
        failedChecks.push(key);
      }
    }
  }

  const allChecksPassed: boolean = failedChecks.length === 0;

  return {
    allChecksPassed,
    failedChecks,
  };
};
