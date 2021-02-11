import React from 'react';
import { Button } from '@material-ui/core';

interface PaginationProps {
    currentPage: number;
    hasNextPage: boolean;
    paginate: (pageNumber: number) => void;
}
const PaginationNavBar: React.FC<PaginationProps> = ({ hasNextPage, currentPage, paginate }: PaginationProps) => (
    < >
        <Button disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}>Back</Button>
        <Button disabled={!hasNextPage} onClick={() => paginate(currentPage + 1)}>Next</Button>
    </>
)

export default PaginationNavBar;
