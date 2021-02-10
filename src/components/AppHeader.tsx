import React from 'react';
import Box from '@material-ui/core/Box';
import { Button, Input } from '@material-ui/core';

interface ViewHeaderProps {
  handleSearch: (event: any) => void;
  handleAddStore: () => void;
}

const AppHeader: React.FC<ViewHeaderProps> = (({ handleSearch, handleAddStore }: ViewHeaderProps) => (
  <Box display="flex" flexDirection="column" alignItems="center">
    <Box component="h2" fontWeight="500" fontSize="2rem" color="#673ab7">Players Management</Box>
    <Box display="flex" width="100%" justifyContent="space-between" p={1}>
      <Input placeholder="Search players..." className="search-input" onChange={handleSearch} />
      <Button color="primary" variant="contained" size="small" onClick={handleAddStore}>Add new player</Button>
    </Box>
</Box>
));

export default AppHeader;