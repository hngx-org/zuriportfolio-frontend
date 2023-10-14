export const months = [
  {
    label: 'January',
    value: 'January',
  },
  {
    label: 'February',
    value: 'February',
  },
  {
    label: 'March',
    value: 'March',
  },
  {
    label: 'April',
    value: 'April',
  },
  {
    label: 'May',
    value: 'May',
  },
  {
    label: 'June',
    value: 'June',
  },
  {
    label: 'July',
    value: 'July',
  },
  {
    label: 'August',
    value: 'August',
  },
  {
    label: 'September',
    value: 'September',
  },
  {
    label: 'October',
    value: 'October',
  },
  {
    label: 'November',
    value: 'November',
  },
  {
    label: 'December',
    value: 'December',
  },
];

export const years: { label: string; value: string }[] = [];

// Define the range of years you want to create
const startFrom = 2000;
const endAt = 2023;

// Loop through the range and create objects for each year
for (let year = startFrom; year <= endAt; year++) {
  // Create an object with "label" and "value" keys
  const yearObject = {
    label: year.toString(),
    value: year.toString(),
  };

  // Push the object into the "years" array
  years.push(yearObject);
}
