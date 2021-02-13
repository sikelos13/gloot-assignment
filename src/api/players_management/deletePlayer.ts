
import axios from 'axios';
import { handleErrorMessage } from '../utils/handleErrorMessage';
export interface DeletePlayerApiResponse {
    success: boolean;
    errorMessage: string;
    successMessage: string;
    status: number
}
/**
 *  Delete an existing player
 *
 * Endpoints:
 * - DELETE player/{id}
 * @param {id} string
 *
 * @returns Promise<DeletePlayerApiResponse>
 */

export const deletePlayerApi = (id: string): Promise<DeletePlayerApiResponse> => (
    axios.delete([`${process.env.REACT_APP_API_ENDPOINT}player/`, id ? `${id}/` : ``].join(""))
        .then((response: any) => {
            if (response.status >= 200 && response.status < 300) {
                return {
                    ...response,
                    successMessage: "Player deleted successfully",
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

