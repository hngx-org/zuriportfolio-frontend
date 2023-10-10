type CancelType = React.ComponentPropsWithRef<'button'>;
type CaretType = React.ComponentPropsWithRef<'svg'>;

export const CancelIcon = (props: CancelType) => {
  return (
    <button {...props}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
};

export const CaretRight = ({ width = '20', height = '20', ...props }: CaretType) => {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.42505 16.6L12.8584 11.1667C13.5 10.525 13.5 9.47503 12.8584 8.83336L7.42505 3.40002"
        stroke="#00894C"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
