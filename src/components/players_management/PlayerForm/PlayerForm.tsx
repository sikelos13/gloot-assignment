import React from 'react';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import { FormControl, FormHelperText, TextField, FormLabel } from '@material-ui/core';
import { Player, PlayerFormData } from '@api/types/Players';
import history from "../../../history";

interface StoreFormProps {
    handleInput: (event: any) => void;
    handleSave: () => void;
    isNewPlayer: boolean;
    formErrorText?: string;
    saving: boolean;
    formData: PlayerFormData;
}

const PlayerForm: React.FC<StoreFormProps> = (({ formData, handleInput, ...props }: StoreFormProps) => {

    const handleCancel = () => {
        history.push('/players');
    }

    return (
        <>
            <Box p="50px 0 15px" display="flex" alignItems="center" justifyContent="space-between">
                <span className="add-store-header">{!props.isNewPlayer ? `Edit ${formData.name}` : "Add new player"}</span>
                <Button color="secondary" variant="contained" size="small" onClick={handleCancel}>Cancel</Button>
            </Box>
            {formData &&
                <Box 
                    key={formData.name}
                    display="flex" 
                    flexDirection="column"
                >
                    <FormControl>
                        <TextField
                            className="form-input-field"
                            label="Player name"
                            variant="outlined"
                            name="title"
                            defaultValue={formData.name}
                            size="small"
                            placeholder="π.χ. My store"
                            onChange={handleInput}
                        />
                    </FormControl>
               
                    <Box display="flex" alignItems="center" justifyContent="flex-end">
                        <Button
                            variant="contained"
                            className="form-save"
                            color="primary"
                            size="small"
                            disabled={props.saving}
                            onClick={props.handleSave}
                        >
                            {props.saving ? 'Saving...' : 'Save'}
                        </Button>
                    </Box>
                </Box>
            }
        </>

    )
});

export default PlayerForm;