import { Player } from "../api/types/Players";

export const getCurrentPlayersList = (pageNumber: number, playersPerPage: number, playersList: Player[]) => {
    const indexOfLastPost = pageNumber * playersPerPage;
    const indexOfFirstPost = indexOfLastPost - playersPerPage;
    const currentPlayersList = playersList.slice(indexOfFirstPost, indexOfLastPost);
    
    return currentPlayersList
}