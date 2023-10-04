import { Poppins, DM_Sans } from 'next/font/google';

export const ppReg = Poppins({
  subsets: ['latin'],
  variable: '--font-ppReg',
  weight: ['400'],
});

// bold poppins
export const ppB = Poppins({
  subsets: ['latin'],
  variable: '--font-ppB',
  weight: ['600'],
});

// extra bold
export const ppEB = Poppins({
  subsets: ['latin'],
  variable: '--font-ppEB',
  weight: ['900'],
});
