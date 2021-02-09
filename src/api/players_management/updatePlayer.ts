
import axios from 'axios';
import { handleErrorMessage } from '../utils/handleErrorMessage';

export interface UpdatePlayerApiResponse {
    success: boolean;
    errorMessage: string;
    status: number;
    successMessage: string;
}
/**
 *  Great new store
 *
 * Endpoints:
 * - PATCH player/${id}
 * @param {id} string
 *
 * @returns Promise<UpdatePlayerApiResponse>
 */

export const updatePlayerApi = (id: string, form: any): Promise<UpdatePlayerApiResponse> => (
    axios.put([`${process.env.REACT_APP_API_ENDPOINT}player/`, id ? `${id}/` : ``].join(""), form)
        .then((response: any) => {
            if (response.status >= 200 && response.status < 300) {
                return {
                    ...response,
                    successMessage: "Player updated successfully",
                    success: true
                }
            } else if (response.status === 400) {
                return {
                    ...response,
                    success: false,
                    errorMessage: handleErrorMessage(response)
                }
            } else {
                return {
                    ...response,
                    success: false,
                    errorMessage: handleErrorMessage(response)
                }
            }
        }).catch(error => {
            return {
                ...error,
                success: false,
                errorMessage: handleErrorMessage(error)
            }
        })
);

