import { inputErrorMessage } from '../../../@types';

function InputError({ inputError, inputName }: { inputError: inputErrorMessage[]; inputName: string }) {
  const error = inputError?.find((error) => error.inputName === inputName);

  return error?.isValid && <p>{error.errorMessage}</p>;
}

export default InputError;
