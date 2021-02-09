import React, { Component } from 'react';
import { fetchPlayersApi } from '@api/players_management/fetchPlayers';
import PlayersList from '@components/players_management/PlayersList';
import { Player } from '@api/types/Players';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import history from "../history";
import { deletePlayerApi, DeletePlayerApiResponse } from '@api/players_management/deletePlayer';
import toast from 'react-hot-toast';
import SkeletonLoader from "@components/common/TableCellLoader";

interface ApplicationState {
    loading: boolean;
    playersList: Player[];
}

class StoreManagement extends Component<{}, ApplicationState> {
    constructor(props: any) {
        super(props)

        this.state = {
            playersList: [],
            loading: false
        }
    }

    componentDidMount() {
        this.fetchPlayers();
    }

    fetchPlayers = () => {
        this.setState({ loading: true });
        fetchPlayersApi().then((response: any) => {
            if (response.success) {
                this.setState({
                    playersList: response.data,
                    loading: false
                })
            } else {
                toast.error(response.errorMessage);
                this.setState({
                    playersList: [],
                    loading: false
                })
            }
        })
    }

    deletePlayer = (id: string) => {
        deletePlayerApi(id).then((response: DeletePlayerApiResponse) => {
            if (response.success) {
                this.fetchPlayers();
                toast.success(response.successMessage, {
                    duration: 3000,
                    style: {
                        padding: '16px'
                    }
                });
            } else {
                toast.error(response.errorMessage, {
                    duration: 3000,
                    style: {
                        padding: '16px'
                    }
                });
            }
        });
    }

    handleRowClick = (event: any) => {
        const { value } = event.currentTarget;

        if (value && value !== "") {
            history.push(`/${value}/edit`, value)
        }
    }

    handleRowDelete = (event: any) => {
        const { value } = event.currentTarget;

        this.deletePlayer(value);
    }

    handleAddStore = () => {
        history.push(`/player/new`);
    }

    render() {
        const { playersList, loading } = this.state;

        return (
            <>
                <Box p="50px 0 15px" display="flex" alignItems="center" justifyContent="space-between">
                    <span className="store-management-header">Players Management</span>
                    <Button color="primary" variant="contained" size="small" onClick={this.handleAddStore}>Add new player</Button>
                </Box>
                <Box
                    mt={2}
                    display="flex"
                    flexDirection="row"
                    flexWrap="wrap"
                    justifyContent="space-evenly"
                >
                    <TableContainer className="table-container">
                        {!loading &&
                            <Table stickyHeader aria-label="sticky table" className="table-main">
                                <TableHead className="table-head">
                                    <TableRow>
                                        <TableCell>Player id</TableCell>
                                        <TableCell>Player name</TableCell>                                     
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {playersList && playersList.length > 0 &&
                                        <PlayersList
                                            playersList={playersList}
                                            handleRowClick={this.handleRowClick}
                                            handleRowDelete={this.handleRowDelete}
                                        />
                                    }

                                    {playersList && playersList.length === 0 &&
                                        <TableRow className="table-row"><TableCell className="no-data-cell" colSpan={8}>No players available</TableCell></TableRow>
                                    }
                                </TableBody>
                            </Table>
                        }
                        {loading &&
                            <SkeletonLoader />
                        }
                    </TableContainer>
                </Box>

            </>
        );
    }
}

export default StoreManagement;