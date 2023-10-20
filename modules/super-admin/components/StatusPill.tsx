const StatusPill = ({ status, ...rest }: { status: string | null }) => {
  const getValue = (status: string | null) => {
    if (typeof status === 'string') {
      switch (status.toLocaleLowerCase()) {
        case 'sanctioned':
        case 'banned':
          return 'yellow';
        case 'deleted':
          return 'red';
        case 'active':
          return 'green';
        default:
          break;
      }
    }
  };

  return (
    <div
      className={` hidden  rounded-2xl px-2 py-1 text-center font-manropeL text-xs font-medium md:flex items-center justify-center gap-2 w-max ${
        getValue(status) === 'yellow'
          ? 'bg-custom-color40 text-yellow-600 rounded-2xl px-2 py-1 text-center font-manropeL font-medium'
          : getValue(status) === 'red'
          ? 'hidden bg-pink-120 text-custom-color34 rounded-2xl px-2 py-1 text-center font-manropeL font-medium'
          : getValue(status) === 'green'
          ? 'bg-green-30 bg-opacity-50 text-brand-green-focused'
          : 'bg-white-200 bg-opacity-50 text-black'
      }`}
      {...rest}
    >
      <span
        className={`inline-block w-2 h-2 rounded-full ${
          getValue(status) === 'yellow'
            ? 'bg-yellow-600'
            : getValue(status) === 'red'
            ? 'bg-custom-color34'
            : getValue(status) === 'green'
            ? 'bg-brand-green-focused'
            : 'bg-black'
        }`}
      ></span>
      <span className="capitalize">{status ?? 'No status'}</span>
    </div>
  );
};

export default StatusPill;
