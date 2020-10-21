import React, { useContext } from "react";
import { useQuery } from "@apollo/client";

//Semantic UI
import { Grid, Container, Transition } from "semantic-ui-react";

// Components
import PostCards from "../components/PostCards";
import PostForm from '../components/PostForm'

//Context
import { AuthContext } from '../context/auth';

//Util
import { FETCH_POSTS_QUERY } from '../utils/graphql';

const Home = () => {
  const {
    loading,
    data,
  } = useQuery(FETCH_POSTS_QUERY);
    
    const { user } = useContext(AuthContext);

    return (
      <Container>
        <Grid columns={3}>
          <Grid.Row className='page-title'>
            <h1>Recent Posts</h1>
          </Grid.Row>
          <Grid.Row>
            {user && (
              <Grid.Column>
                <PostForm />
              </Grid.Column>
            )}
            {loading ? (
              <h1>loading...</h1>
            ) : (
              <Transition.Group duration={200}>
                {data &&
                  data.getPosts.map((post) => (
                    <Grid.Column key={post.id} style={{ marginBottom: "10px" }}>
                      <PostCards post={post} />
                    </Grid.Column>
                  ))}
              </Transition.Group>
            )}
          </Grid.Row>
        </Grid>
      </Container>
    );
};



export default Home;
