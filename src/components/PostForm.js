import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

//Semantic UI
import { Form, Button } from "semantic-ui-react";

//Util
import { FETCH_POSTS_QUERY } from "../utils/graphql";

const PostForm = () => {
  const [values, setValues] = useState({
    body: "",
  });
  const [errors, setErrors] = useState({});

  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      console.log(data);
      const newData = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          ...data,
          getPosts: { newData },
        },
      });
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].message);
    },
  });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    createPost();
    setValues({ body: "" });
  };

  return (
    <>
      <Form onSubmit={handleOnSubmit}>
        <h2>Create a Post:</h2>
        <Form.Field>
          <Form.Input
            placeholder='Hi World!'
            name='body'
            onChange={handleOnChange}
            values={values.body}
          />
          <Button type='submit' color='teal'>
            Submit
          </Button>
        </Form.Field>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className='ui error message' style={{ marginBottom: 20 }}>
          <ul className='list'>
            <li>{Object.values(errors)}</li>
          </ul>
        </div>
      )}
    </>
  );
};

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
