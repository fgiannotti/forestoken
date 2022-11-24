import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectAccreditationState = ({ stateFilter, setStateFilter }) => {
  const handleChange = (event) => {
    setStateFilter(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel>Filtrar</InputLabel>
      <Select value={stateFilter} label="Filtrar" onChange={handleChange}>
        <MenuItem value={'all'} selected>
          Todas las solicitudes
        </MenuItem>
        <MenuItem value={'generated'}>Generada</MenuItem>
        <MenuItem value={'approved'}>Aprobada</MenuItem>
        <MenuItem value={'rejected'}>Rechazada</MenuItem>
        <MenuItem value={'minted'}>Emitida</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectAccreditationState;
