import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePosts from './pages/SinglePosts'

// Components
import MenuBar from "./components/MenuBar";

// Context
import { AuthProvider } from "./context/auth";

// Private Route
import AuthRoute from './utils/AuthRoute'

function App() {
  return (
    <AuthProvider>
      <Router>
        <MenuBar />
        <Switch>
          <Route exact path='/' component={Home} />
          <AuthRoute exact path='/login' component={Login} />
          <AuthRoute exact path='/register' component={ Register } />
          <Route exact path="/posts/:postId" component={SinglePosts} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
