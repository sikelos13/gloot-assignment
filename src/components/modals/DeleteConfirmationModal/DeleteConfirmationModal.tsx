import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import { Player } from '../../../api/types/Players';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

interface DeleteConfirmationModalProps {
    handleCloseModal: () => void;
    handleDeletePlayer: (id: string) => void;
    open: boolean;
    player: Player;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = (({ player, open, handleCloseModal, handleDeletePlayer }: DeleteConfirmationModalProps) => (
    <Dialog onClose={handleCloseModal} open={open}>
        <DialogTitle style={{ cursor: 'move', width: 300 }}>
            Confirm delete player
        </DialogTitle>
        <DialogContent>
            <Box flexWrap="no-wrap">
              Do you want to delete player <Box component="span" fontWeight="bold">{player.name}</Box>?
            </Box>
            
        </DialogContent>
        <DialogActions>
        <Button autoFocus onClick={() => handleDeletePlayer(player.id)} color="primary">
                Delete
          </Button>
            <Button autoFocus onClick={handleCloseModal}>
                Cancel
          </Button>
        </DialogActions>
    </Dialog>
));

export default DeleteConfirmationModal;