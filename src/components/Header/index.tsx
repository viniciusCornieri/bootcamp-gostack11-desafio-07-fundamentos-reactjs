import React from 'react';

import { Link } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
  activeMenu: 'Dashboard' | 'Import';
}

const Header: React.FC<HeaderProps> = ({
  size = 'large',
  activeMenu,
}: HeaderProps) => (
  <Container size={size}>
    <header>
      <img src={Logo} alt="GoFinances" />
      <nav>
        <Link
          className={activeMenu === 'Dashboard' ? 'nav-link-active' : ''}
          to="/"
        >
          Listagem
        </Link>
        <Link
          className={activeMenu === 'Import' ? 'nav-link-active' : ''}
          to="/import"
        >
          Importar
        </Link>
      </nav>
    </header>
  </Container>
);

export default Header;
