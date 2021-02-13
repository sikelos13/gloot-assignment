import { Pagination } from '../api/types/Pagination';

export const getHasNextPage = (pagination: Pagination) => {
    return pagination.playersPerPage * pagination.currentPage < pagination.totalResults;
}