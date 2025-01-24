import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Checkbox, FormControlLabel, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Department, Doctor } from '../types/index.ts';
import { v4 as uuidv4 } from 'uuid';

interface AddDoctorDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (id: string, name: string, department: Department, isHead: boolean) => void;
  onUpdate: (id: string, name: string, department: Department, isHead: boolean) => void;
  doctor?: Doctor; 
}

const DoctorDialog: React.FC<AddDoctorDialogProps> = ({ open, onClose, onAdd,onUpdate, doctor }) => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState(Department.SURGERY);
  const [isHead, setIsHead] = useState(false);

  useEffect(() => {
    if (doctor) {
      setName(doctor.name);
      setDepartment(doctor.department);
      setIsHead(doctor.isHead)
    } else {
      setName('');
      setDepartment(Department.SURGERY);
      setIsHead(false);
    }
  }, [doctor]);

  const handleSubmit = () => {
    if (doctor) {
      onUpdate(doctor.id, name, department, isHead);
    } else {
      onAdd(uuidv4(), name, department, isHead);
    }
    onClose();
    setName('');
    setDepartment(Department.SURGERY);
    setIsHead(false);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{doctor ? 'Редактировать врача' : 'Добавить врача'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="ФИО"
          type="text"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormControl fullWidth margin="dense" variant="outlined">
          <InputLabel>Департамент</InputLabel>
          <Select
            value={department}
            onChange={(e) => setDepartment(e.target.value as Department)}
            label="Департамент"
          >
            <MenuItem value={Department.SURGERY}>Хирургическое</MenuItem>
            <MenuItem value={Department.CARDIOLOGY}>Кардиологическое</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={<Checkbox checked={isHead} onChange={(e) => setIsHead(e.target.checked)} />}
          label="Заведующий"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Отмена
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {doctor ? 'Сохранить' : 'Добавить'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DoctorDialog;
