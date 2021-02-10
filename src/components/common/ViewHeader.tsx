import React from 'react';
import Box from '@material-ui/core/Box';

interface ViewHeaderProps {
    title: string;
}

const ViewHeader: React.FC<ViewHeaderProps> = (({ title }: ViewHeaderProps) => (
  <Box p="50px 0 15px" display="flex" alignItems="center" justifyContent="space-between">
      <span className="players-management-header">{title}</span>
  </Box>
));

export default ViewHeader;