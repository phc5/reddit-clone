import React from 'react';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
import { Button } from '@chakra-ui/core';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = ({}) => {
  const [{}, register] = useRegisterMutation();
  const router = useRouter();
  return (
    <Wrapper>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async ({ username, password }, { setErrors }) => {
          const response = await register({ username, password });
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else {
            router.push('/');
          }
        }}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="Username"
              label="Username"
            />
            <InputField
              name="password"
              placeholder="Password"
              label="Password"
              type="password"
            />
            <Button type="submit" mt="4" isLoading={isSubmitting}>
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
