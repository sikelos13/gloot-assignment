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
import { deletePlayerApi, DeletePlayerApiResponse } from '@api/players_management/deletePlayer';
import toast from 'react-hot-toast';
import SkeletonLoader from "@components/common/TableCellLoader";
import AppHeader from '@components/AppHeader';
import _debounce from 'lodash-es/debounce';
import { updatePlayerApi, UpdatePlayerApiResponse } from '@api/players_management/updatePlayer';
import { createPlayerApi, CreatePlayerApiResponse } from '@api/players_management/createPlayer';

interface ApplicationState {
    loading: boolean;
    playersList: Player[];
    filteredPlayerList: Player[];
    newPlayerName: string;
}

class StoreManagement extends Component<{}, ApplicationState> {
    constructor(props: any) {
        super(props)

        this.state = {
            playersList: [],
            filteredPlayerList: [],
            loading: false,
            newPlayerName: ""
        }

        this.handleSearch = _debounce(this.handleSearch, 500);
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
                    filteredPlayerList: response.data,
                    loading: false
                })
            } else {
                toast.error(response.errorMessage);
                this.setState({
                    playersList: [],
                    filteredPlayerList: [],
                    loading: false
                })
            }
        })
    }

    handleSearch = (event: any) => {
        const { playersList } = this.state;
        const value = event.target.value

        if (playersList) {
            if (value !== '') {
                const returnedFilteredPlayers = playersList.filter((player: Player) => {
                    if (player.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                        return player;
                    }
                });

                this.setState({
                    filteredPlayerList: returnedFilteredPlayers,
                })
            } else {
                this.setState({
                    filteredPlayerList: playersList,
                })
            }
        }
    }


    handleUpdate = (form: any) => {
        const { filteredPlayerList } = this.state;

        if (form.name !== "") {
            updatePlayerApi(form.id, form).then((response: UpdatePlayerApiResponse) => {
                if (response.success) {
                    const updatedList = filteredPlayerList.map((player: Player) => {
                        if (form.id === player.id) {
                            return {
                                ...player,
                                name: form.name
                            }
                        }

                        return player;
                    });

                    this.setState({ filteredPlayerList: updatedList, playersList: updatedList });
                    toast.success(response.successMessage, {
                        duration: 4000
                    });
                } else {
                    toast.error(response.errorMessage, {
                        duration: 4000
                    });
                }
            });
        } else {
            toast.error("Name can not be empty", {
                duration: 3000
            });
        }
    }

    handleRowDelete = (id: string) => {
        const { filteredPlayerList } = this.state;

        deletePlayerApi(id).then((response: DeletePlayerApiResponse) => {
            if (response.success) {
                const updatedList = filteredPlayerList.filter((player: Player) => {
                    return id !== player.id;
                });

                this.setState({ filteredPlayerList: updatedList, playersList: updatedList });
                toast.success(response.successMessage, {
                    duration: 3000
                });
            } else {
                toast.error(response.errorMessage, {
                    duration: 3000
                });
            }
        });
    }

    handleAddPlayer = () => {
        const { playersList, newPlayerName } = this.state;
        let updatedList = playersList;

        const formData = {
            name: newPlayerName
        }

        if (newPlayerName !== "") {
            createPlayerApi(formData).then((response: CreatePlayerApiResponse) => {
                if (response.success) {
                    updatedList.push(response.data);

                    this.setState({ filteredPlayerList: updatedList, playersList: updatedList });
                    toast.success(response.successMessage, {
                        duration: 4000
                    });
                } else {
                    toast.error(response.errorMessage, {
                        duration: 4000
                    });
                }
            });
        }
    }

    handleChangeInput = (event: any) => {
        const { value } = event.target;

        this.setState({ newPlayerName: value })
    }

    render() {
        const { filteredPlayerList, loading, newPlayerName } = this.state;

        return (
            <Box
                boxShadow="0 15px 17px 0 rgb(0 0 0 / 16%), 0 15px 17px 0 rgb(0 0 0 / 12%)"
                border="1px black solid"
                borderRadius="8px"
                p={2}
                mt={2}
            >
                <AppHeader
                    handleSearch={this.handleSearch}
                    handleAddPlayer={this.handleAddPlayer}
                    handleChangeInput={this.handleChangeInput}
                    newPlayerName={newPlayerName}
                />
                <Box
                    mt={2}
                    pb={2}
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

                                    {filteredPlayerList && filteredPlayerList.length > 0 &&
                                        <PlayersList
                                            playersList={filteredPlayerList}
                                            handleUpdate={this.handleUpdate}
                                            handleDelete={this.handleRowDelete}
                                        />
                                    }

                                    {filteredPlayerList && filteredPlayerList.length === 0 &&
                                        <TableRow className="table-row">
                                            <TableCell 
                                            className="no-data-cell" 
                                            colSpan={8}>
                                                No players available
                                            </TableCell>
                                        </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        }
                        {loading &&
                            <SkeletonLoader />
                        }
                    </TableContainer>
                </Box>
            </Box>
        );
    }
}

export default StoreManagement;