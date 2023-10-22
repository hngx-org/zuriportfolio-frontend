import { sevenDays, thirtyDays, twelveMonths, twentyFourHours } from '../db/dashboard';
import { formatToNigerianNaira } from './formatCurrency';

export function logQueryResult(queryName: string, queryData: any) {
  console.log(`${queryName}:`, queryData);
}

export const chartMargins = {
  top: 5,
  right: 20,
  left: 20,
  bottom: 5,
};

export function getSalesTooltipMessage(label: string, payload: any[]) {
  let message = `Your total revenue `;
  if (label && payload && payload[0]) {
    const saleValue = formatToNigerianNaira(payload[0]?.value);
    if (twelveMonths.includes(label)) {
      message += `in ${label} was ${saleValue}`;
    } else if (sevenDays.includes(label)) {
      message += `on ${label} was ${saleValue}`;
    } else if (thirtyDays.includes(label)) {
      message += `on the ${label} was ${saleValue}`;
    } else if (twentyFourHours.includes(label)) {
      message += `at ${label} was ${saleValue}`;
    } else {
      message += `for ${label} was ${saleValue}`;
    }
  }

  return message;
}

export function getTrafficTooltipMessage(label: string, payload: any[]) {
  let message = `Your store had `;
  if (label && payload && payload[0]) {
    if (twelveMonths.includes(label)) {
      message += `${payload[0]?.value} views in ${label}`;
    } else if (sevenDays.includes(label)) {
      message += `${payload[0]?.value} views on ${label}`;
    } else if (thirtyDays.includes(label)) {
      message += `${payload[0]?.value} views on the ${label}`;
    } else if (twentyFourHours.includes(label)) {
      message += `${payload[0]?.value} views at ${label}`;
    } else {
      message += `${payload[0]?.value} views`;
    }
  }

  return message;
}
