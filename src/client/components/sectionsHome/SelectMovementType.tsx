import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectMovementType = ({ movementsFilter, setMovementsFilter }) => {
  const handleChange = (event) => {
    setMovementsFilter(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel>Filtrar</InputLabel>
      <Select value={movementsFilter} label="Filtrar" onChange={handleChange}>
        <MenuItem value={'all'} selected>
          Todos los movimientos
        </MenuItem>
        <MenuItem value={'debits'}>Débitos</MenuItem>
        <MenuItem value={'credits'}>Créditos</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectMovementType;
