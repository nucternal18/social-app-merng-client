import React, { useState, useContext } from "react";
import { Button, Form, Container } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";

// import { useForm } from '../utils/hooks';

//Context
import { AuthContext } from '../context/auth'

const Register = (props) => {
  const context = useContext(AuthContext);
    const [errors, setErrors] = useState({})
  const [value, setValue] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      console.log(result.data.register);
          context.login(result.data.register)
          props.history.push('/')
      },
      onError(err) {
          setErrors(err.graphQLErrors[0].extensions.exception.errors);
      },
    variables: value,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
      addUser();
      setValue({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
  };

  const handleOnChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  return (
    <div className='form-container'>
      <Container>
        <Form
          onSubmit={handleSubmit}
          noValidate
          className={loading ? "loading" : ""}
        >
          <h1>Register</h1>
          <Form.Input
            label='Username'
            placeholder='Username..'
            name='username'
            type='text'
            value={value.username}
            error={errors.username ? true : false}
            onChange={handleOnChange}
          />
          <Form.Input
            label='Email'
            placeholder='Email..'
            name='email'
            type='email'
            value={value.email}
            error={errors.email ? true : false}
            onChange={handleOnChange}
          />
          <Form.Input
            label='Password'
            placeholder='Password..'
            name='password'
            type='password'
            value={value.password}
            error={errors.password ? true : false}
            onChange={handleOnChange}
          />
          <Form.Input
            label='Confirm Password'
            placeholder='Confirm Password..'
            name='confirmPassword'
            type='password'
            value={value.confirmPassword}
            error={errors.confirmPassword ? true : false}
            onChange={handleOnChange}
          />
          <Button type='submit' primary style={{ marginTop: "10px" }}>
            Register
          </Button>
        </Form>

        {Object.keys(errors).length > 0 && (
          <div className='ui error message'>
            <ul className='list'>
              {Object.values(errors).map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </div>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      username
      createdAt
      token
    }
  }
`;

export default Register;
