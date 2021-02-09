
import axios from 'axios';
import { handleErrorMessage } from '../utils/handleErrorMessage';

export interface FetchPlayerApiResponse {
    success: boolean;
    errorMessage: string;
    successMessage: string;
    status: number
}
/**
 *  Get player details
 *
 * Endpoints:
 * - GET /player/{id}
 *
 *
 * @returns Promise<FetchPlayerApiResponse>
 */

export const fetchPlayerApi = (id: string): Promise<FetchPlayerApiResponse> => (
    axios.get([`${process.env.REACT_APP_API_ENDPOINT}player/`, id ? `${id}/` : ``].join(""))
        .then((response: any) => {
            if (response.status >= 200 && response.status < 300) {
                return {
                    ...response,
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
        }).catch((error: any) => {
            return {
                ...error,
                success: false,
                errorMessage: handleErrorMessage(error)
            }
        })
);

