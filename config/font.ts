import { Poppins, DM_Sans, Manrope } from 'next/font/google';

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

export const manropeL = Manrope({
  subsets: ['latin'],
  variable: '--font-manropeL',
<<<<<<< HEAD
  weight: ['300'],
=======
  weight: ['400'],
>>>>>>> 36680b076791b0d976563ba9c9d2dcf0ae60e75c
});

export const manropeB = Manrope({
  subsets: ['latin'],
  variable: '--font-manropeB',
  weight: ['600'],
});

export const manropeEB = Manrope({
  subsets: ['latin'],
  variable: '--font-manropeEB',
  weight: ['700'],
});
