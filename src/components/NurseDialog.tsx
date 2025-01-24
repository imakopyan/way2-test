import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Checkbox, FormControlLabel, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Department, Nurse } from '../types/index.ts';
import { v4 as uuidv4 } from 'uuid';

interface AddNurseDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (id: string, name: string, department: Department) => void;
  onUpdate: (id: string, name: string, department: Department) => void;
  nurse?: Nurse; 
}

const NurseDialog: React.FC<AddNurseDialogProps> = ({ open, onClose, onAdd,onUpdate, nurse }) => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState(Department.SURGERY);

  useEffect(() => {
    if (nurse) {
      setName(nurse.name);
      setDepartment(nurse.department);
    } else {
      setName('');
      setDepartment(Department.SURGERY);
    }
  }, [nurse]);

  const handleSubmit = () => {
    if (nurse) {
      onUpdate(nurse.id, name, department);
    } else {
      onAdd(uuidv4(), name, department);
    }
    onClose();
    setName('');
    setDepartment(Department.SURGERY);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{nurse ? 'Редактировать медсестру' : 'Добавить медсестру'}</DialogTitle>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Отмена
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {nurse ? 'Сохранить' : 'Добавить'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NurseDialog;
