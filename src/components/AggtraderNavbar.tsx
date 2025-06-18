// src/components/AggtraderNavbar.tsx
import React from 'react';

import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const StyledNavLink = styled(Link)<{ active: boolean }>`
  position: relative;
  padding: 0 8px 4px;
  font-size: 1.25rem;
  color: inherit;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #00ffe9;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: ${({ active }) => (active ? '2px' : '0')};
    background: linear-gradient(to right, #00ffe9, #003b3c);
    transition: height 0.3s;
  }
`;

function NavLinkStyled({ href, children }: NavLinkProps) {
  const { pathname } = useLocation();
  const isActive = pathname === href || pathname.startsWith(href);
  return (
    <StyledNavLink to={href} active={isActive}>
      {children}
    </StyledNavLink>
  );
}

const navItems = [
  { href: '/spot', label: 'Spot' },
  { href: 'https://lending.aggtrade.xyz/', label: 'Lend/Borrow' },
  { href: 'https://perp.aggtrade.xyz/', label: 'Perps' },
  { href: 'https://yield.aggtrade.xyz/', label: 'Yield Farming' },
  { href: 'https://aggtrade.xyz/profile', label: 'Account' },
];

const Nav = styled.nav`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 40px;
  background: transparent;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Logo = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

const NavList = styled.ul`
  display: flex;
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export default function AggtraderNavbar() {
  return (
    <Nav>
      <Logo>AggTrade</Logo>
      <NavList>
        {navItems.map(({ href, label }) => (
          <li key={href}>
            <NavLinkStyled href={href}>{label}</NavLinkStyled>
          </li>
        ))}
      </NavList>
    </Nav>
  );
}
