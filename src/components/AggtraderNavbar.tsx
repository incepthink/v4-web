'use client';

import React, { useState } from 'react';

import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  useTheme,
  useMediaQuery,
  Typography,
} from '@mui/material';

import { AccountMenu } from '@/views/menus/AccountMenu/AccountMenu';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  isMobile?: boolean;
  onClick?: () => void;
}

function NavLink({ href, children, isActive, isMobile, onClick }: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      style={{
        position: 'relative',
        padding: isMobile ? '12px 0' : '4px 8px',
        fontSize: isMobile ? '1.1rem' : '1.25rem',
        textDecoration: 'none',
        color: `${href === '#' ? '#00ffe9' : 'white'}`,
        transition: 'color 0.2s',
        display: 'block',
        width: '100%',
      }}
      onMouseOver={(e) => {
        (e.currentTarget as HTMLElement).style.color = '#00ffe9';
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLElement).style.color = `${href === '#' ? '#00ffe9' : 'white'}`;
      }}
    >
      {children}
      <span
        style={{
          content: "''",
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: isActive ? '2px' : '0',
          width: '100%',
          background: 'linear-gradient(to right, #00FFE9, #003B3C)',
          transition: 'height 0.2s',
          display: 'block',
        }}
      />
    </a>
  );
}

const navItems = [
  { href: 'https://aggtrade.xyz/spot', label: 'Spot' },
  { href: '#', label: 'Perps' },
  { href: 'https://lending.aggtrade.xyz/', label: 'Lend/Borrow' },
  { href: 'https://yield.aggtrade.xyz/', label: 'Yield Farming' },
  { href: 'https://aggtrade.xyz/profile', label: 'Account' },
];

export default function AggtraderNavbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg')); // Mobile below 1200px
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        style={{
          position: 'sticky',
          top: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '8px 16px' : '8px 10px',
          backgroundColor: 'rgb(5, 14, 25)',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          zIndex: 1300,
          minHeight: '64px',
        }}
      >
        {/* Logo */}
        <a
          href="https://aggtrade.xyz/"
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            textDecoration: 'none',
          }}
        >
          <div style={{ width: isMobile ? '32px' : '40px' }}>
            <img
              src="/aggtrade.png"
              alt="AggTrade Logo"
              style={{ width: '100%', objectFit: 'cover' }}
            />
          </div>
          <h2
            style={{
              fontWeight: 600,
              color: 'white',
              cursor: 'pointer',
              fontSize: isMobile ? '1.25rem' : '1.5rem',
              margin: 0,
            }}
          >
            AggTrade
          </h2>
        </a>

        {/* Desktop Navigation */}
        {!isMobile && (
          <ul
            style={{
              listStyle: 'none',
              display: 'flex',
              gap: '24px',
              margin: 0,
              padding: 0,
            }}
          >
            {navItems.map(({ href, label }) => {
              const isInternal = href.startsWith('/');
              const isActive = isInternal && (pathname === href || pathname.startsWith(href));

              return (
                <li key={href} style={{ margin: 0 }}>
                  <NavLink href={href} isActive={isActive}>
                    {label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        )}

        {/* Desktop Account Menu */}
        {!isMobile && <AccountMenu />}

        {/* Mobile Menu */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AccountMenu />
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileMenuToggle}
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </div>
        )}
      </nav>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuClose}
        sx={{
          zIndex: 1400,
          '& .MuiDrawer-paper': {
            width: 280,
            backgroundColor: 'rgb(5, 14, 25)',
            color: 'white',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          {/* Drawer Header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2,
              pb: 2,
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Typography
              component="h3"
              sx={{ color: 'white', fontWeight: 600, fontSize: '1.25rem' }}
            >
              Menu
            </Typography>
            <IconButton
              onClick={handleMobileMenuClose}
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Navigation Links */}
          <List sx={{ p: 0 }}>
            {navItems.map(({ href, label }) => {
              const isInternal = href.startsWith('/');
              const isActive = isInternal && (pathname === href || pathname.startsWith(href));

              return (
                <ListItem key={href} sx={{ p: 0 }}>
                  <ListItemButton
                    sx={{
                      p: 0,
                      '&:hover': {
                        backgroundColor: 'rgba(0, 255, 233, 0.1)',
                      },
                    }}
                  >
                    <NavLink
                      href={href}
                      isActive={isActive}
                      isMobile={true}
                      onClick={handleMobileMenuClose}
                    >
                      {label}
                    </NavLink>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
