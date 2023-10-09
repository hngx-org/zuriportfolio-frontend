import { useState, FormEvent } from "react";
import { inputErrorMessage } from "../@types";
import getInputError from "../helpers/getInputError";

const useInputError = () => {
  const [inputErrors, setInputErrors] = useState<inputErrorMessage[]>();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // turns formData to an object
    const formValuesObj = Object.fromEntries(formData.entries());

    // turn the formValues object to an array for easy mapping
    const formValuesArray = Object.entries(formValuesObj);
    const validFormValues = formValuesArray.map((value) => getInputError(value[0], value[1] as string));
    setInputErrors(validFormValues);
    console.log(validFormValues);
  };

  return {inputErrors, handleSubmit};
};

export default useInputError;
