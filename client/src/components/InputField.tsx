import React, { InputHTMLAttributes } from 'react';
import { useField } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/core';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  placeholder: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size,
  ...props
}) => {
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input {...field} {...props} id={field.name} mb={4} />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
