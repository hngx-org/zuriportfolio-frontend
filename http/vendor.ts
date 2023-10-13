import axios from 'axios';

export const vendorInstance = axios.create({
  baseURL: 'https://staging.zuri.team/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiNzVkZDIyLTBhMTAtNGY0NC05Yjc1LWE3NDI1Nzg0NzFiMiIsImZpcnN0TmFtZSI6InNhcHBoaXJlQGdtYWlsLmNvbSIsImVtYWlsIjoic2FwcGhpcmVqdWRpdGhAZ21haWwuY29tIiwiaWF0IjoxNjk3MjA3OTQ2fQ.9cWy9mxCLtLZIfDzFoV0KOwwiHP36BcPYXs4P6YDIZA `,
  },
});
