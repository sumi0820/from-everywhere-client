import { SyntheticEvent, VFC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

type Name = {
  name?: string;
};

const Header: VFC = () => {
  const [activeItem, setActiveItem] = useState('home');
  const { pathname } = useLocation();

  useEffect(() => {
    switch (pathname) {
      case '/auth':
        setActiveItem('auth');
        break;
      case '/others':
        setActiveItem('others');
        break;
      default:
        setActiveItem('home');
        break;
    }
  }, [pathname]);

  const handleItemClick = (_e: SyntheticEvent, { name }: Name) => {
    setActiveItem(name ?? 'home');
  };

  return (
    <Menu stackable>
      <Menu.Item
        name="home"
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Item
        name="auth"
        active={activeItem === 'auth'}
        onClick={handleItemClick}
        as={Link}
        to="/auth"
      />
      <Menu.Item
        name="others"
        active={activeItem === 'others'}
        onClick={handleItemClick}
        as={Link}
        to="/others"
      />
    </Menu>
  );
};

export default Header;
