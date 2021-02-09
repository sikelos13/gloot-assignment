import React, { memo } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Player } from '@api/types/Players';
import { Button } from '@material-ui/core';

interface StoresListProps {
    playersList: Player[]
    handleRowClick: (event: any) => void;
    handleRowDelete: (event: any) => void;
}

const PlayersList: React.FC<StoresListProps> = memo(({ playersList, handleRowClick, handleRowDelete }: StoresListProps) => (
    <>
        {playersList.map((player: Player) => (
            <TableRow
                hover
                key={player.id}
                className="table-row"
            >
                <TableCell width="40%">
                    {player.id}
                </TableCell>
                <TableCell width="40%">
                    {player.name}
                </TableCell>
                <TableCell width="20%">
                    <Button
                        className="edit-button-list"
                        variant="contained"
                        color="primary"
                        size="small"
                        value={player.id}
                        onClick={handleRowClick}
                    >
                        Edit
                    </Button>
                    <Button
                        className="edit-button-list"
                        variant="contained"
                        color="secondary"
                        size="small"
                        value={player.id}
                        onClick={handleRowDelete}
                    >
                        Delete
                    </Button>
                </TableCell>
            </TableRow>
        ))
        }
    </>
));

export default PlayersList;