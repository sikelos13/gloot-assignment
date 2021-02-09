import React, { Component } from 'react';
import { Player, PlayerFormData } from '@api/types/Players';
import _debounce from 'lodash-es/debounce';
import { createPlayerApi, CreatePlayerApiResponse } from '@api/players_management/createPlayer';
import { getInitState } from "../utils/getInitState";
import history from "../../../history";
import toast from 'react-hot-toast';
import PlayerForm from '../PlayerForm/PlayerForm';

interface AddPlayerFormControllerState {
    formData: PlayerFormData;
    saving: boolean;
    formErrorText: string;
}

class AddPlayerFormController extends Component<{}, AddPlayerFormControllerState> {
    constructor(props: any) {
        super(props)

        this.state = getInitState();
        this.handleInput = _debounce(this.handleInput, 500);
    }

    handleInput = (event: any) => {
        // const { formData } = this.state;
        // const { name, value } = event.target;

        // this.setState({
        //     formErrorText: "",
        //     formData: {
        //         ...formData,
        //         [name]: value,
        //     }
        // });
    };

    handleSave = () => {
        // const { formData } = this.state;
        // const form = getCleanFormData(formData);

        // this.setState({ saving: true });
        // const formIsInvalid = validateForm(formData).formIsInvalid;
        // const formErrorText = validateForm(formData).formErrorText;

        // if (!formIsInvalid) {
        //     createPlayerApi(form).then((response: CreateStoreApplicationApiResponse) => {
        //         if (response.success) {
        //             getInitState();
        //             this.handleCancel();
        //             toast.success(response.successMessage, {
        //                 duration: 3000
        //             });
        //         } else {
        //             this.setState({saving: false })
        //             toast.error(response.errorMessage, {
        //                 duration: 3000
        //             });
        //         }
        //     });
        // } else {
        //     this.setState({ saving: false, formErrorText })
        // }
    }

    render() {
        const {  
            saving, 
            formErrorText, 
            formData
        } = this.state;

        return (
            <PlayerForm
                handleInput={this.handleInput}
                formErrorText={formErrorText}
                formData={formData}
                handleSave={this.handleSave}
                saving={saving}
                isNewPlayer={true}
            />
        );
    }
}

export default AddPlayerFormController;