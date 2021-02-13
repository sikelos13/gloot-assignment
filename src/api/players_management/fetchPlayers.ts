
import axios from 'axios';
import { handleErrorMessage } from '../utils/handleErrorMessage';
import { Player } from '../../api/types/Players';
export interface FetchPlayersApiResponse {
    success: boolean;
    errorMessage: string;
    status: number
    data: Player[];
}
/**
 *  Get players list
 *
 * Endpoints:
 * - GET /players
 *
 *
 * @returns Promise<FetchPlayersApiResponse>
 */

export const fetchPlayersApi = (): Promise<FetchPlayersApiResponse> => (
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}players`)
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

