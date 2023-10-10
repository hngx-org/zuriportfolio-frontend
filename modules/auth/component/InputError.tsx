import { inputErrorMessage } from '../../../@types';

const InputError = ({ inputError, inputName }: { inputError?: inputErrorMessage[]; inputName: string }) => {
  const error = inputError?.find((error) => error.inputName === inputName);

  return (
    <div>
      {error?.isValid === false && (
        <p className="text-brand-red-primary text-xs md:text-sm mt-2">{error.errorMessage}</p>
      )}
    </div>
  );
};

export default InputError;
