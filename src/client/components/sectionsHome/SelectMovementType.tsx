import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectMovementType = () => {
  const [movimientos, setMovimiento] = React.useState(0);

  const handleChange = (event) => {
    setMovimiento(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel>Filtrar</InputLabel>
      <Select value={movimientos} label="Filtrar" onChange={handleChange}>
        <MenuItem value={0} selected>
          Todos los movimientos
        </MenuItem>
        <MenuItem value={1}>Débitos</MenuItem>
        <MenuItem value={2}>Créditos</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectMovementType;
