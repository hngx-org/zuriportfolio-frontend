import { ImSpinner8 } from 'react-icons/im';
const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <ImSpinner8 className="w-6 h-6  text-brand-success-primary animate-spin" />
    </div>
  );
};

export default Loader;
