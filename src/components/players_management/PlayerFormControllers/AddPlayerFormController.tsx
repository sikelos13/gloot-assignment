import React, { Component } from 'react';
import { PlayerFormData } from '@api/types/Players';
import { createPlayerApi, CreatePlayerApiResponse } from '@api/players_management/createPlayer';
import { getInitState } from "../utils/getInitState";
import history from "../../../history";
import toast from 'react-hot-toast';
import PlayerForm from '../PlayerForm/PlayerForm';
import Box from '@material-ui/core/Box';

interface AddPlayerFormControllerState {
    formData: PlayerFormData;
    saving: boolean;
    formErrorText: string;
}

class AddPlayerFormController extends Component<{}, AddPlayerFormControllerState> {
    constructor(props: any) {
        super(props)

        this.state = getInitState();
    }

    handleInput = (event: any) => {
        const { value } = event.target;

        this.setState({
            formErrorText: "",
            formData: {
                name: value,
            }
        });
    };

    handleSave = () => {
        const { formData } = this.state;

        this.setState({ saving: true });

        if (formData.name !== "") {
            createPlayerApi(formData).then((response: CreatePlayerApiResponse) => {
                if (response.success) {
                    toast.success(response.successMessage, {
                        duration: 3000
                    });
                    history.push('/players');
                } else {
                    this.setState({ saving: false })
                    toast.error(response.errorMessage, {
                        duration: 3000
                    });
                }
            });
        } else {
            this.setState({ saving: false, formErrorText: "Name can not be empty" })
        }
    }

    render() {
        const {
            saving,
            formErrorText,
            formData
        } = this.state;

        return (
            <Box
                boxShadow="0 15px 17px 0 rgb(0 0 0 / 16%), 0 15px 17px 0 rgb(0 0 0 / 12%)"
                border="1px black solid"
                borderRadius="8px"
                p={2}
                mt={2}
            >
                <PlayerForm
                    handleInput={this.handleInput}
                    formErrorText={formErrorText}
                    formData={formData}
                    handleSave={this.handleSave}
                    saving={saving}
                    isNewPlayer={true}
                />
            </Box>
        );
    }
}

export default AddPlayerFormController;