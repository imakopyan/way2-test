import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import initialNurses from '../data/nurses.json';
import { getDepartment } from '../helpers/departmentHelper.ts';
import { Department } from '../types';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import NurseDialog from "./NurseDialog.tsx";

const NursesTable: React.FC = () => {
  const [nurses, setNurses] = useState(initialNurses);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingNurse, setEditingNurse] = useState<any>(null);

  const handleOpenDialog = () => {
    setEditingNurse(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddNurse = (
    id: string,
    name: string,
    department: Department,
    ) => {
    const newNurse = {
      id,
      name,
      department,
    };
    setNurses([...nurses, newNurse]);
  };

  const handleEditNurse = (nurse: any) => {
    setEditingNurse(nurse);
    setOpenDialog(true);
  };

  const handleUpdateNurse = (
    id: string,
    name: string,
    department: Department,
  ) => {
    const updatedNurses = nurses.map((nurse) =>
      nurse.id === id
        ? { ...nurse, name, department }
        : nurse
    );
    setNurses(updatedNurses);
  };

  const handleDeleteNurse = (id: string) => {
    const updatedNurses = nurses.filter((nurse) => nurse.id !== id);
    setNurses(updatedNurses);
  };

  return (
    <Paper elevation={0}>
      <Button sx={{ mb: 4 }} variant="contained" color="primary" onClick={handleOpenDialog}>
        Добавить
      </Button>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ФИО</TableCell>
            <TableCell>Отделение</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {nurses.map((nurse) => (
            <TableRow key={nurse.id}>
              <TableCell>{nurse.name}</TableCell>
              <TableCell>{getDepartment(nurse.department as Department)}</TableCell>
              <TableCell>
                  <Button onClick={() => handleEditNurse(nurse)}>
                    <EditIcon />
                  </Button>
                  <Button onClick={() => handleDeleteNurse(nurse.id)}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <NurseDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onAdd={handleAddNurse}
        onUpdate={handleUpdateNurse}
        nurse={editingNurse}
      />
    </Paper>
  );
};

export default NursesTable;
