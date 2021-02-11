import { Player } from '../api/types/Players';
import { Pagination } from '../types';

export const getHasNextPage = (pagination: Pagination, playersList: Player[]) => {
    return pagination.playersPerPage * pagination.currentPage < playersList.length;
}