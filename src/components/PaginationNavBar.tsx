import React from 'react';
import { Box, Button, FormLabel, TableCell } from '@material-ui/core';
import NativeSelect from '@material-ui/core/NativeSelect';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import IconButton from '@material-ui/core/IconButton';

interface PaginationProps {
    currentPage: number;
    playersPerPage: number;
    hasNextPage: boolean;
    isSearching: boolean;
    paginate: (pageNumber: number) => void;
    handlePerPageChange: (event: any) => void;
}
const PaginationNavBar: React.FC<PaginationProps> = ({ isSearching, playersPerPage, hasNextPage, handlePerPageChange, currentPage, paginate }: PaginationProps) => (
    <>
        <TableCell className="Pagination_TableCell">
            <Box display="flex" alignItems="center">
                <Box>
                    <Box component={FormLabel} mr="10px">Players per page</Box>
                    <NativeSelect
                        value={playersPerPage}
                        onChange={handlePerPageChange}
                        disabled={isSearching}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                    </NativeSelect>
                </Box>
                <Box>
                    <IconButton disabled={currentPage === 1 || isSearching} onClick={() => paginate(currentPage - 1)}><ArrowBackIcon /></IconButton>
                    Page  {currentPage}
                    <IconButton disabled={!hasNextPage || isSearching} onClick={() => paginate(currentPage + 1)}><ArrowForwardIcon /></IconButton>
                </Box>
            </Box>
        </TableCell>
    </>
)

export default PaginationNavBar;
