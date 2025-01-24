import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import initialDoctors from "../data/doctors.json";
import { getDepartment } from "../helpers/departmentHelper.ts";
import { Department } from "../types/index.ts";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoctorDialog from "./DoctorDialog.tsx";

const DoctorsTable: React.FC = () => {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<any>(null);

  const handleOpenDialog = () => {
    setEditingDoctor(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddDoctor = (
    id: string,
    name: string,
    department: Department,
    isHead: boolean) => {
    const newDoctor = {
      id,
      name,
      department,
      isHead,
    };
    setDoctors([...doctors, newDoctor]);
  };

  const handleEditDoctor = (doctor: any) => {
    setEditingDoctor(doctor);
    setOpenDialog(true);
  };

  const handleUpdateDoctor = (
    id: string,
    name: string,
    department: Department,
    isHead: boolean
  ) => {
    const updatedDoctors = doctors.map((doctor) =>
      doctor.id === id
        ? { ...doctor, name, department, isHead }
        : doctor
    );
    setDoctors(updatedDoctors);
  };

  const handleDeleteDoctor = (id: string) => {
    const updatedDoctors = doctors.filter((doctor) => doctor.id !== id);
    setDoctors(updatedDoctors);
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
              <TableCell>Заведующий</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell>{doctor.name}</TableCell>
                <TableCell>
                  {getDepartment(doctor.department as Department)}
                </TableCell>
                <TableCell>{doctor.isHead ? "Да" : ""}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditDoctor(doctor)}>
                    <EditIcon />
                  </Button>
                  <Button onClick={() => handleDeleteDoctor(doctor.id)}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DoctorDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onAdd={handleAddDoctor}
        onUpdate={handleUpdateDoctor}
        doctor={editingDoctor}
      />
    </Paper>
  );
};

export default DoctorsTable;
