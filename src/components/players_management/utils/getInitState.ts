export const getInitState = () => {
    const state = {
        saving: false,
        formErrorText: "",
        formData: {
            uuid: "",
            name: ""
        }
    }

    return state;
}