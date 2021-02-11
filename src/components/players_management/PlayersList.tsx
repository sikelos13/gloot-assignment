import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Player } from '../../api/types/Players';
import { Button, Input } from '@material-ui/core';

interface StoresListProps {
    playersList: Player[]
    handleUpdate: (form: any) => void;
    handleDelete: (id: string) => void;
}

const PlayersList: React.FC<StoresListProps> = (({ playersList, handleDelete, handleUpdate }: StoresListProps) => {
    const [isEditMode, setMode] = useState(false);
    const [name, setName] = useState("");
    const [selectedRow, setSelectedRow] = useState("");

    const closeEditMode = () => {
        setMode(!isEditMode);
        setSelectedRow("");
    }

    const handlePrimaryAction = (isEditRow: boolean, id: string) => {
        if (isEditMode) {
            const form = {
                name,
                id
            }

            handleUpdate(form);
            closeEditMode();
        } else {
            setMode(!isEditRow);
            setSelectedRow(id);
        }
    }

    const handleSecondaryAction = (isEditRow: boolean, id: string) => {
        if (isEditRow) {
            closeEditMode();
            setName("");
        } else {
            handleDelete(id)
        }
    }

    const onChangeInput = (event: any) => {
        const value = event.target.value;
        setName(value);
    }

    return (
        <>
            {playersList.map((player: Player) => {
                const isEditRow = isEditMode && selectedRow === player.id;
                return (
                    <TableRow
                        hover
                        key={player.id}
                        className="table-row"
                    >
                        <TableCell width="40%">
                            {player.id}
                        </TableCell>
                        <TableCell width="40%">
                            {isEditMode && selectedRow === player.id
                                ? <Input
                                    defaultValue={player.name}
                                    onChange={onChangeInput}
                                />
                                : player.name
                            }
                        </TableCell>
                        <TableCell width="20%">
                            <Button
                                className="edit-button-list"
                                variant="contained"
                                color="primary"
                                size="small"
                                value={player.id}
                                onClick={() => handlePrimaryAction(isEditRow, player.id)}
                            >
                                {isEditRow ? "Save" : "Edit"}
                            </Button>
                            <Button
                                className="edit-button-list"
                                variant="contained"
                                color="secondary"
                                size="small"
                                value={player.id}
                                onClick={() => handleSecondaryAction(isEditRow, player.id)}
                            >
                                {isEditRow ? "Cancel" : "Delete"}
                            </Button>
                        </TableCell>
                    </TableRow>
                )
            })
            }
        </>
    )

});

export default PlayersList;