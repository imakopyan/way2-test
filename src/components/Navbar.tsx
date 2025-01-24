import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  color: 'white',
  textDecoration: 'none',
  padding: theme.spacing(1, 2),
  '&.active': {
    backgroundColor: theme.palette.action.active,
    borderRadius: '4px',
  },
}));

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          way2-test
        </Typography>
        <StyledNavLink to="/" end>
          Врачи
        </StyledNavLink>
        <StyledNavLink to="/nurses">
          Медсестры
        </StyledNavLink>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
