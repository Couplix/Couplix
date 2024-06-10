import { HeaderContainer, MenuHeader, Menu } from '@/styles/Header.style';
import Logo from '@/assets/logo.png';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  return (
    <HeaderContainer>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <Link to="/" reloadDocument>
          <img src={Logo} alt="로고" />
        </Link>
      </div>
      <MenuHeader>
        <Menu $active={location.pathname === '/'} >
          <Link to={"/"}>Recommend</Link>
        </Menu>
        <Menu $active={location.pathname === '/reviews'}>
          <Link to={"/reviews"}>Review</Link>
        </Menu>
      </MenuHeader>
    </HeaderContainer>
  );
}

export default Header;
