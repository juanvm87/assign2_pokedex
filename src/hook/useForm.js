import { useState } from "react";

const useForm = (initialForm = {}) => {
  const [formSate, setFormSate] = useState(initialForm);

  const onInputChange = ({ target }) => {
    const { name, value } = target;

    setFormSate({ ...formSate, [name]: value });
  };

  const onResetForm = () => {
    setFormSate(initialForm);
  };

  return {
    ...formSate,
    formSate,
    onInputChange,
    onResetForm,
  };
};

export default useForm;