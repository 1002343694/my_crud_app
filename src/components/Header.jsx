// src/components/Header.jsx
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

const StyledAppBar = styled(AppBar)`
  background-color: #3f51b5;
`;

const Header = () => (
  <StyledAppBar position="static">
    <Toolbar>
      <Typography variant="h6">
        CRUD App
      </Typography>
    </Toolbar>
  </StyledAppBar>
);

export default Header;
