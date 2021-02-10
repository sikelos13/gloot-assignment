import React from 'react';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import { FormControl, TextField, FormHelperText } from '@material-ui/core';
import { PlayerFormData } from '@api/types/Players';
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
            <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                <Box component="h3" fontWeight="500" fontSize="1.5rem" color="#673ab7">{!props.isNewPlayer ? `Edit ${formData.name}` : "Add new player"}</Box>
                {props.formErrorText &&
                        <FormHelperText className="form-error" error={true}>{props.formErrorText}</FormHelperText>
                    }
            </Box>
            {formData &&
                <Box 
                    display="flex" 
                    flexDirection="column"
                >
                    <FormControl>
                        <TextField
                            className="form-input-field"
                            label="Player name"
                            variant="outlined"
                            name="name"
                            defaultValue={formData.name}
                            size="small"
                            placeholder="e.g. Cristiano Ronaldo"
                            onChange={handleInput}
                        />
                    </FormControl>
               
                    <Box mt={1} display="flex" alignItems="center" justifyContent="flex-end">
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            disabled={props.saving}
                            onClick={props.handleSave}
                        >
                            {props.saving ? 'Saving...' : 'Save'}
                        </Button>

                        <Button 
                            color="secondary" 
                            className="cancel-form-button"
                            variant="contained" 
                            size="small" 
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            }
        </>

    )
});

export default PlayerForm;