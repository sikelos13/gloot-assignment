export const getIsSelectedRow = (isEditMode: boolean, selectedRow: string, id: string) => {
    return isEditMode && selectedRow === id;
}