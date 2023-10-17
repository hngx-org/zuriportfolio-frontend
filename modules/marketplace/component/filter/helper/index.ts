export function constructApiUrl(url: string, queryParams: Record<string, string | number>) {
  // Initialize the base URL using the URL Class constructor
  let apiUrl = new URL(url);

  // Iterate through the query parameters and append them to the URL if not empty
  for (const key in queryParams) {
    let value = queryParams[key];

    // Check if the value is "All" and set it to an empty string if it is
    if (value === 'All') {
      value = '';
    }

    // Check if the value is NaN and set it to an empty string
    if (isNaN(Number(value))) {
      value = '';
    }

    // Check if the value is not empty and append it to the URL
    if (value !== null && value !== undefined && value !== '') {
      apiUrl.searchParams.set(key, value.toString());
    }
  }

  return apiUrl;
}
