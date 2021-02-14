import { Player } from "../api/types/Players";

export const getUpdatedItemsListOnEdit = (form: any, list: Player[]) => {
    return list.map((player: Player) => {
        if (form.id === player.id) {
            return {
                ...player,
                name: form.name
            }
        }
        return player;
    });
}