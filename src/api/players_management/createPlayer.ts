
import axios from 'axios';
import { handleErrorMessage } from '../utils/handleErrorMessage';

export interface CreatePlayerApiResponse {
    success: boolean;
    errorMessage: string;
    successMessage: string;
    status: number
}
/**
 *  Great new store
 *
 * Endpoints:
 * - POST api/store_management/
 * @param {FormData} form
 *
 * @returns Promise<CreatePlayerApiResponse>
 */

export const createPlayerApi = (form: any): Promise<CreatePlayerApiResponse> => (
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}player`, form)
        .then((response: any) => {
            if (response.status >= 200 && response.status < 300) {
                return {
                    ...response,
                    successMessage: "Player created successfully",
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

