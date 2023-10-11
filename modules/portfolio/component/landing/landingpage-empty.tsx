import Button from '@ui/Button';
import { useContext } from 'react';
import Portfolio from '../../../../context/PortfolioLandingContext';

const LandinEmptyState = () => {
  const { viewPortfolio, buildPortfolio } = useContext(Portfolio);
  return (
    <div className="flex w-full min-h-[50vh] flex-col items-center">
      <svg width="336" height="268" viewBox="0 0 336 268" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" width="335" height="268" fill="white" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M84.9203 179.56H206.86C207.55 179.56 208.223 179.485 208.87 179.344C209.518 179.485 210.19 179.56 210.88 179.56H280.56C285.741 179.56 289.94 175.36 289.94 170.18C289.94 164.999 285.741 160.8 280.56 160.8H272.52C267.34 160.8 263.14 156.6 263.14 151.42C263.14 146.239 267.34 142.04 272.52 142.04H297.98C303.161 142.04 307.36 137.84 307.36 132.66C307.36 127.479 303.161 123.28 297.98 123.28H268.5C273.681 123.28 277.88 119.08 277.88 113.9C277.88 108.719 273.681 104.52 268.5 104.52H182.74C187.921 104.52 192.12 100.32 192.12 95.1398C192.12 89.9593 187.921 85.7598 182.74 85.7598H106.36C101.18 85.7598 96.9803 89.9593 96.9803 95.1398C96.9803 100.32 101.18 104.52 106.36 104.52H52.7603C47.5798 104.52 43.3803 108.719 43.3803 113.9C43.3803 119.08 47.5798 123.28 52.7603 123.28H86.2603C91.4407 123.28 95.6403 127.479 95.6403 132.66C95.6403 137.84 91.4407 142.04 86.2603 142.04H32.6603C27.4798 142.04 23.2803 146.239 23.2803 151.42C23.2803 156.6 27.4798 160.8 32.6603 160.8H84.9203C79.7398 160.8 75.5403 164.999 75.5403 170.18C75.5403 175.36 79.7398 179.56 84.9203 179.56ZM303.34 179.56C308.521 179.56 312.72 175.36 312.72 170.18C312.72 164.999 308.521 160.8 303.34 160.8C298.16 160.8 293.96 164.999 293.96 170.18C293.96 175.36 298.16 179.56 303.34 179.56Z"
          fill="#E6F5EA"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M152.078 150.491C151.974 151.233 151.92 151.99 151.92 152.76C151.92 161.641 159.119 168.84 168 168.84C176.88 168.84 184.08 161.641 184.08 152.76C184.08 151.99 184.025 151.233 183.921 150.491H222.94V186.26C222.94 188.481 221.14 190.28 218.92 190.28H117.08C114.859 190.28 113.06 188.481 113.06 186.26V150.491H152.078Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M185.42 150.08C185.42 159.701 177.62 167.5 168 167.5C158.379 167.5 150.58 159.701 150.58 150.08C150.58 149.768 150.588 149.459 150.604 149.151H113.06L125.871 111.272C126.423 109.639 127.955 108.54 129.679 108.54H206.32C208.044 108.54 209.576 109.639 210.129 111.272L222.94 149.151H185.395C185.411 149.459 185.42 149.768 185.42 150.08Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M182.871 151.359C182.871 158.793 176.213 166.16 168 166.16C159.787 166.16 153.129 158.793 153.129 151.359C153.129 151.118 153.136 149.538 153.15 149.301H125.12L136.056 122.711C136.528 121.449 137.836 120.6 139.307 120.6H196.693C198.165 120.6 199.472 121.449 199.944 122.711L210.88 149.301H182.85C182.864 149.538 182.871 151.118 182.871 151.359Z"
          fill="#E6F5EA"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M114.735 149.426V184.92C114.735 186.215 115.785 187.265 117.08 187.265H218.92C220.215 187.265 221.265 186.215 221.265 184.92V149.426L208.543 111.809C208.22 110.856 207.327 110.215 206.321 110.215H129.679C128.674 110.215 127.78 110.856 127.458 111.809L114.735 149.426Z"
          stroke="#009254"
          strokeWidth="2.5"
        />
        <path
          d="M131.82 148.74C137.095 148.74 142.788 148.74 148.899 148.74C151.413 148.74 151.413 150.507 151.413 151.42C151.413 160.301 158.778 167.5 167.863 167.5C176.948 167.5 184.313 160.301 184.313 151.42C184.313 150.507 184.313 148.74 186.827 148.74H220.26M121.869 148.74H125.12H121.869Z"
          stroke="#009254"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M201.634 78.126L186.76 94.8132M166.794 72.3604V94.8132V72.3604ZM131.82 78.126L146.694 94.8132L131.82 78.126Z"
          stroke="#009254"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="flex justify-center items-center flex-col gap-2 -mt-5 mb-6 md:w-[50%] text-center">
        <h1 className="font-semibold text-2xl">Start showcasing your work</h1>
        <p className="text-sm text-gray-500">
          It looks like there are no projects here yet, Let&apos;s change that ! Click the button to add your first
          project and start building your impressive portfolio{' '}
        </p>
      </div>
      <div className="flex md:flex-row flex-col w-full justify-center items-center gap-4">
        <Button className="rounded-lg" onClick={viewPortfolio} intent={'secondary'}>
          View Templates
        </Button>
        <Button className="rounded-lg" onClick={buildPortfolio}>
          Build your Portfolio
        </Button>
      </div>
    </div>
  );
};

export default LandinEmptyState;
