import { HeaderContainer } from '@/styles/Header.style';
import Logo from '@/assets/logo.png';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <HeaderContainer>
        <Link to="/" reloadDocument>
          <img src={Logo} alt="로고" />
        </Link>
    </HeaderContainer>
  );
}

export default Header;
