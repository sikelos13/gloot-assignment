import React, { Component } from 'react';
import { fetchPlayersApi } from '../api/players_management/fetchPlayers';
import PlayersList from '../components/players_management/PlayersList';
import { Player } from '../api/types/Players';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import { deletePlayerApi, DeletePlayerApiResponse } from '../api/players_management/deletePlayer';
import toast from 'react-hot-toast';
import SkeletonLoader from "../components/TableCellLoader";
import AppHeader from '../components/AppHeader';
import { updatePlayerApi, UpdatePlayerApiResponse } from '../api/players_management/updatePlayer';
import { createPlayerApi, CreatePlayerApiResponse } from '../api/players_management/createPlayer';
import PaginationNavBar from '../components/PaginationNavBar';
import { Pagination } from '../types';
import { getCurrentPlayersList } from '../utils/getCurrentPlayersList';
import { TableFooter } from '@material-ui/core';
import { getHasNextPage } from '../utils/getHasNextPage';

interface ApplicationState {
    loading: boolean;
    playersList: Player[];
    filteredPlayerList: Player[];
    newPlayerName: string;
    pagination: Pagination;
}

class StoreManagement extends Component<{}, ApplicationState> {
    constructor(props: any) {
        super(props)

        this.state = {
            playersList: [],
            filteredPlayerList: [],
            loading: false,
            newPlayerName: "",
            pagination: {
                currentPage: 1,
                playersPerPage: 5
            },
        }

        // this.handleSearch = setTimeout(this.handleSearch, 500);
    }

    // debounce = (callback: any, wait: number, immediate: boolean = false) => {
    //     let timeout = null as number | null;

    //     return function() {
    //       const callNow = immediate && !timeout
    //       const next = () => callback.apply(this, arguments)

    //       clearTimeout(timeout)
    //       timeout = setTimeout(next, wait)

    //       if (callNow) {
    //         next()
    //       }
    //     }
    //   }

    componentDidMount() {
        this.fetchPlayers();
    }

    fetchPlayers = () => {
        const { pagination } = this.state;
        const { playersPerPage } = pagination;

        this.setState({ loading: true });
        fetchPlayersApi().then((response: any) => {
            if (response.success) {
                const currentPlayersList = getCurrentPlayersList(1, playersPerPage, response.data);

                this.setState({
                    playersList: response.data,
                    filteredPlayerList: currentPlayersList,
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
        const { pagination, playersList } = this.state;
        const { playersPerPage, currentPage } = pagination;
        const value = event.target.value

        if (playersList) {
            if (value !== '') {
                const returnedFilteredPlayers = playersList.filter((player: Player) => {
                    if (player.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                        return player;
                    }
                });
                const currentPlayersList = getCurrentPlayersList(currentPage, playersPerPage, returnedFilteredPlayers);

                this.setState({
                    filteredPlayerList: currentPlayersList,
                })
            } else {
                const currentPlayersList = getCurrentPlayersList(1, playersPerPage, playersList);

                this.setState({
                    filteredPlayerList: currentPlayersList,
                })
            }
        }
    }

    handleUpdate = (form: any) => {
        const { pagination, playersList } = this.state;
        const { playersPerPage, currentPage } = pagination;

        if (form.name !== "") {
            updatePlayerApi(form.id, form).then((response: UpdatePlayerApiResponse) => {
                if (response.success) {
                    const updatedList = playersList.map((player: Player) => {
                        if (form.id === player.id) {
                            return {
                                ...player,
                                name: form.name
                            }
                        }
                        return player;
                    });

                    const currentPlayersList = getCurrentPlayersList(currentPage, playersPerPage, updatedList);

                    this.setState({ filteredPlayerList: currentPlayersList, playersList: updatedList });
                    toast.success(response.successMessage, { duration: 4000 });
                } else {
                    toast.error(response.errorMessage, { duration: 4000 });
                }
            });
        } else {
            toast.error("Name can not be empty", { duration: 3000 });
        }
    }

    handleRowDelete = (id: string) => {
        const { playersList, pagination } = this.state;
        const { playersPerPage, currentPage } = pagination;

        deletePlayerApi(id).then((response: DeletePlayerApiResponse) => {
            if (response.success) {
                const updatedList = playersList.filter((player: Player) => {
                    return id !== player.id;
                });

                const currentPlayersList = getCurrentPlayersList(currentPage, playersPerPage, updatedList);

                this.setState({
                    filteredPlayerList: currentPlayersList,
                    playersList: updatedList,
                });
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

    handleAddPlayer = (event: any) => {
        event.preventDefault();
        const { playersList, newPlayerName, pagination } = this.state;
        const { playersPerPage, currentPage } = pagination;

        let updatedList = playersList;

        const formData = {
            name: newPlayerName
        }

        if (newPlayerName !== "") {
            createPlayerApi(formData).then((response: CreatePlayerApiResponse) => {
                if (response.success) {
                    updatedList.push(response.data);
                    const currentPlayersList = getCurrentPlayersList(currentPage, playersPerPage, updatedList);

                    this.setState({ filteredPlayerList: currentPlayersList, playersList: updatedList, newPlayerName: "" }, () => {
                        toast.success(response.successMessage, {
                            duration: 4000
                        });
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

    handleChangeInput = (event: any) => {
        const { value } = event.target;

        this.setState({ newPlayerName: value })
    }

    handlePaginate = (pageNumber: number) => {
        const { pagination, playersList } = this.state;
        const { playersPerPage } = pagination;

        const currentPlayersList = getCurrentPlayersList(pageNumber, playersPerPage, playersList)

        this.setState({
            pagination: {
                ...pagination,
                currentPage: pageNumber
            },
            filteredPlayerList: currentPlayersList
        });
    }

    render() {
        const { filteredPlayerList, loading, newPlayerName, pagination, playersList } = this.state;

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
                                            <TableCell className="no-data-cell" colSpan={8}>
                                                No players available
                                            </TableCell>
                                        </TableRow>
                                    }
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell className="pagination-cell" colSpan={1}>
                                            <PaginationNavBar
                                                paginate={this.handlePaginate}
                                                currentPage={pagination.currentPage}
                                                hasNextPage={getHasNextPage(pagination, playersList)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>
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