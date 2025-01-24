import React from 'react';
import DoctorsTable from '../components/DoctorsTable.tsx';
import { Container, Typography } from '@mui/material';

const DoctorsPage: React.FC = () => {
  return (
    <Container sx={{ p: 2, width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Учет Врачей
      </Typography>
      <DoctorsTable />
    </Container>
  );
};

export default DoctorsPage;
