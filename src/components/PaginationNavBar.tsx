import React from 'react';
import { Button } from '@material-ui/core';
import NativeSelect from '@material-ui/core/NativeSelect';
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
        <Button disabled={currentPage === 1 || isSearching} onClick={() => paginate(currentPage - 1)}>Back</Button>
            <NativeSelect
                value={playersPerPage}
                onChange={handlePerPageChange}
                disabled={isSearching}
            >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            </NativeSelect>
        <Button disabled={!hasNextPage || isSearching} onClick={() => paginate(currentPage + 1)}>Next</Button>
    </>
)

export default PaginationNavBar;
