import React from 'react';
import NursesTable from '../components/NursesTable.tsx';
import { Container, Typography } from '@mui/material';

const NursesPage: React.FC = () => {
  return (
    <Container sx={{ p: 2, width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Учет Медсестер
      </Typography>
      <NursesTable />
    </Container>
  );
};

export default NursesPage;
