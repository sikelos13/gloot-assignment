import React, { Component } from 'react';
import { Player, PlayerFormData } from '@api/types/Players';
import { updatePlayerApi, UpdatePlayerApiResponse } from '@api/players_management/updatePlayer';
import { fetchPlayerApi, FetchPlayerApiResponse } from '@api/players_management/fetchPlayer';
import history from "../../../history";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box } from '@material-ui/core';
import toast from 'react-hot-toast';
import PlayerForm from '../PlayerForm/PlayerForm';
import { getInitState } from "../utils/getInitState";

interface EditPlayerFormControllerState {
    formData: PlayerFormData;
    saving: boolean;
    formErrorText: string;
    loading?: boolean;
}

class EditPlayerFormController extends Component<{}, EditPlayerFormControllerState> {
    constructor(props: any) {
        super(props)

        this.state = getInitState();
    }

    componentDidMount() {
        this.fetchPlayer()
    }

    fetchPlayer = () => {
        const playerId = history.location.state as string;

        if (!playerId || playerId === "") {
            history.push('/players');
        }

        this.setState({ loading: true });
        fetchPlayerApi(playerId).then((response: FetchPlayerApiResponse) => {
            if (response.success) {
                console.log(response)
                this.setState({
                    loading: false,
                    formData: response.data
                })
            } else {
                this.setState({ saving: false, loading: false });
                toast.error(response.errorMessage, { duration: 3000 });
            }
        })
    }

    handleInput = (event: any) => {
        const { formData } = this.state;
        const { value } = event.target;

        this.setState({
            formData: {
                ...formData,
                name: value
            },
        });
    };

    handleSave = () => {
        // const { updatedFormData, store } = this.state;

        // if (!updatedFormData) {
        //     this.handleCancel();
        //     return;
        // }

        // const form = getCleanFormData(updatedFormData);

        // this.setState({ saving: true });
        // const formIsInvalid = validateForm(updatedFormData).formIsInvalid;
        // const formErrorText = validateForm(updatedFormData).formErrorText;

        // if (!formIsInvalid && store) {
        //     updateStoreApi(store.uuid, form).then((response: UpdateStoreApiResponse) => {
        //         if (response.success) {
        //             getInitState();
        //             this.handleCancel();
        //             toast.success(response.successMessage, {
        //                 duration: 3000
        //             });
        //         } else {
        //             this.setState({ saving: false });
        //             toast.error(response.errorMessage, {
        //                 duration: 3000
        //             });
        //         }
        //     })
        // } else {
        //     this.setState({ saving: false, formErrorText })
        // }
    }

    render() {
        const { saving, formData, loading, formErrorText } = this.state;

        return (
            <Box 
                boxShadow="0 15px 17px 0 rgb(0 0 0 / 16%), 0 15px 17px 0 rgb(0 0 0 / 12%)" 
                border="1px black solid" 
                borderRadius="8px" 
                p={2} 
                mt={2}
            >
                {!loading &&
                    <PlayerForm
                        handleInput={this.handleInput}
                        formErrorText={formErrorText}
                        formData={formData}
                        handleSave={this.handleSave}
                        saving={saving}
                        isNewPlayer={false}
                    />
                }
                {loading &&
                    <Box display="flex" justifyContent="center">
                        <CircularProgress color="primary" className="loading-spinner" />
                    </Box>
                }
            </Box>
        );
    }
}

export default EditPlayerFormController;