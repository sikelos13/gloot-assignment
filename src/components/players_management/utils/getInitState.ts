import { Player } from "@api/types/Players";

export const getInitState = (player?: Player) => {
    const state = {
        saving: false,
        formErrorText: "",
        formData: {
            uuid: player ? player.id : "",
            name: player ? player.name : ""
        }
    }

    return state;
}