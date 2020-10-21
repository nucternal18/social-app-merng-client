import React, { useState, useContext } from "react";
import { Button, Form, Container } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";

// import { useForm } from "../utils/hooks";

//Context
import { AuthContext } from "../context/auth";

const Login = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [value, setValue] = useState({
    username: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
          context.login(result.data.login);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: value,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
    setValue({
      username: "",
      password: "",
    });
  };
  return (
    <div className='form-container'>
      <Container>
        <Form
          onSubmit={handleSubmit}
          noValidate
          className={loading ? "loading" : ""}
        >
          <h1>Login</h1>
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
            label='Password'
            placeholder='Password..'
            name='password'
            type='password'
            value={value.password}
            error={errors.password ? true : false}
            onChange={handleOnChange}
          />
          <Button type='submit' primary style={{ marginTop: "10px" }}>
            Login
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

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      createdAt
      token
    }
  }
`;

export default Login;
