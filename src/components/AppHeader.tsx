import React from 'react';
import Box from '@material-ui/core/Box';
import { Input } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';

interface ViewHeaderProps {
  handleSearch: (event: any) => void;
  handleChangeInput: (event: any) => void;
  handleAddPlayer: () => void;
  newPlayerName: string;
}

const AppHeader: React.FC<ViewHeaderProps> = (({ handleSearch, handleAddPlayer, handleChangeInput, newPlayerName }: ViewHeaderProps) => (
  <Box display="flex" flexDirection="column" alignItems="center">
    <Box component="h2" fontWeight="500" fontSize="2rem" color="#673ab7">Players Management</Box>
    <Box display="flex" width="100%" justifyContent="space-between" p={1}>
      <Input placeholder="Search players..." className="search-input" onChange={handleSearch} />
        <form>
        <Box display="flex" alignItems="center">
          <TextField
            className="form-input-field"
            label="Add new player"
            variant="outlined"
            name="name"
            size="small"
            value={newPlayerName}
            placeholder="Insert name"
            onChange={handleChangeInput}
          />
          <IconButton type="submit" color="primary" size="small" onClick={handleAddPlayer}>
            <AddIcon />
          </IconButton>
          </Box>
        </form>
    </Box>
  </Box>
));

export default AppHeader;