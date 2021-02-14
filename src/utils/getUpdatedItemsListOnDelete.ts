import { Player } from "../api/types/Players";

export const getUpdatedItemsListOnDelete = (id: string, list: Player[]) => {
    return list.filter((player: Player) => {
        return id !== player.id;
    });

}