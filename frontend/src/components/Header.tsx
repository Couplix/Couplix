import { HeaderContainer, MenuHeader, Menu } from '@/styles/Header.style';
import Logo from '@/assets/logo.png';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Header() {
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState(Number);

  useEffect(() => {
    if (location.pathname === '/') {
      setSelectedMenu(1);
    } else if (location.pathname === '/reviews') {
      setSelectedMenu(0);
    }
  }, [location]);

  return (
    <HeaderContainer>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <Link to="/" reloadDocument>
          <img src={Logo} alt="로고" />
        </Link>
      </div>
      <MenuHeader>
        <Menu $active={selectedMenu === 1}>
          <Link to={"/"}>Recommend</Link>
        </Menu>
        <Menu $active={selectedMenu === 0}>
          <Link to={"/reviews"}>Review</Link>
        </Menu>
      </MenuHeader>
    </HeaderContainer>
  );
}

export default Header;
