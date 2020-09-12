import React, { useState } from 'react';
import NextLink from 'next/link';
import { withUrqlClient } from 'next-urql';
import { Formik, Form } from 'formik';
import { Button, Link, Box } from '@chakra-ui/core';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useForgotPasswordMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

export const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [{}, forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async ({ email }, { setErrors }) => {
          await forgotPassword({ email });
          setComplete(true);
        }}
      >
        {({ values, handleChange, isSubmitting }) =>
          complete ? (
            <Box>
              Check your email for your password reset link.{' '}
              <NextLink href="/">
                <Link>Go Home</Link>
              </NextLink>
            </Box>
          ) : (
            <Form>
              <InputField name="email" placeholder="Email" label="Email" />

              <Button type="submit" mt="4" isLoading={isSubmitting}>
                Forgot password
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
