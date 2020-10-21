import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, Container } from "semantic-ui-react";

//Context
import { AuthContext } from '../context/auth';

const MenuBar = () => {
    const pathname = window.location.pathname;
    // /about
  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const {user, logout} = useContext(AuthContext);
     const [ activeItem, setActiveItem ] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem({ activeItem: name });

  const menuBar = user ? (
    <Menu pointing secondary size='massive' color='teal'>
      <Container>
        <Menu.Item
          name={user.username}
          active
          as={Link}
          to='/'
        />
        <Menu.Menu position='right'>
          <Menu.Item
            name='logout'
            onClick={logout}
          />
        </Menu.Menu>
      </Container>
    </Menu>
  ) : (
    <Menu pointing secondary size='massive' color='teal'>
      <Container>
        <Menu.Item
          name='home'
          active={activeItem === "home"}
          onClick={handleItemClick}
          as={Link}
          to='/'
        />
        <Menu.Menu position='right'>
          <Menu.Item
            name='login'
            active={activeItem === "login"}
            onClick={handleItemClick}
            as={Link}
            to='/login'
          />
          <Menu.Item
            name='register'
            active={activeItem === "register"}
            onClick={handleItemClick}
            as={Link}
            to='/register'
          />
        </Menu.Menu>
      </Container>
    </Menu>
  );

  return menuBar
};

export default MenuBar;
