import React, { Component } from 'react';
import { fetchPlayersApi, FetchPlayersApiResponse } from '../api/players_management/fetchPlayers';
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
import { Pagination } from '../api/types/Pagination';
import { getCurrentPlayersList } from '../utils/getCurrentPlayersList';
import { TableFooter } from '@material-ui/core';
import { getHasNextPage } from '../utils/getHasNextPage';
import { debounce } from '../utils/debounce';
import DeleteConfirmationModal from "../components/modals/DeleteConfirmationModal";

interface PlayersManagementState {
    loading: boolean;
    playersList: Player[];
    filteredPlayerList: Player[];
    newPlayerName: string;
    pagination: Pagination;
    isSearching: boolean;
    selectedPlayer?: Player;
    issModalOpen: boolean;
}

class PlayersManagement extends Component<{}, PlayersManagementState> {
    constructor(props: any) {
        super(props)

        this.state = {
            playersList: [],
            filteredPlayerList: [],
            loading: false,
            newPlayerName: "",
            isSearching: false,
            issModalOpen: false,
            pagination: {
                currentPage: 1,
                totalResults: 0,
                playersPerPage: 5
            },
        }

        this.handleSearch = debounce(this.handleSearch, 500);
    }

    componentDidMount() {
        this.fetchPlayers();
    }

    fetchPlayers = () => {
        const { pagination } = this.state;
        const { playersPerPage } = pagination;

        this.setState({ loading: true });
        fetchPlayersApi().then((response: FetchPlayersApiResponse) => {
            if (response.success) {
                const currentPlayersList = getCurrentPlayersList(1, playersPerPage, response.data);

                this.setState({
                    playersList: response.data,
                    pagination: {
                        ...pagination,
                        totalResults: response.data.length
                    },
                    filteredPlayerList: currentPlayersList,
                    loading: false
                })
            } else {
                toast.error(response.errorMessage);
                this.setState({
                    playersList: [],
                    filteredPlayerList: [],
                    pagination: {
                        ...pagination,
                        totalResults: 0
                    },
                    loading: false
                })
            }
        })
    }

    handleSearch = (event: any) => {
        const { pagination, playersList } = this.state;
        const { playersPerPage } = pagination;
        const value = event.target.value

        if (playersList.length > 0) {
            if (value !== '') {
                const returnedFilteredPlayers = playersList.filter((player: Player) => {
                    if (player.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                        return player;
                    }
                });
                const currentPlayersList = getCurrentPlayersList(1, playersPerPage, returnedFilteredPlayers);

                this.setState({
                    filteredPlayerList: currentPlayersList,
                    isSearching: true,
                    pagination: {
                        ...pagination,
                        totalResults: returnedFilteredPlayers.length
                    }
                })
            } else {
                const currentPlayersList = getCurrentPlayersList(1, playersPerPage, playersList);

                this.setState({
                    filteredPlayerList: currentPlayersList,
                    isSearching: false,
                    pagination: {
                        ...pagination,
                        totalResults: playersList.length
                    }
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
                    pagination: {
                        ...pagination,
                        totalResults: updatedList.length
                    }
                });
                this.handleCloseModal();
                
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

                    this.setState({ 
                            filteredPlayerList: currentPlayersList, 
                            playersList: updatedList, 
                            newPlayerName: "" ,
                            pagination: {
                                ...pagination,
                                totalResults: updatedList.length
                            }
                        }, () => {
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

        const currentPlayersList = getCurrentPlayersList(pageNumber, playersPerPage, playersList);

        this.setState({
            pagination: {
                ...pagination,
                currentPage: pageNumber
            },
            filteredPlayerList: currentPlayersList
        });
    }

    handlePerPageChange = (event: any) => {
        const { playersList } = this.state;
        const { value } = event.target;

        const currentPlayersList = getCurrentPlayersList(1, value, playersList);

        this.setState({ 
            pagination: {
                currentPage: 1,
                playersPerPage: value,
                totalResults: playersList.length
            },
            filteredPlayerList: currentPlayersList
        })
    }

    handleOpenModal = (player: Player) => {
        this.setState({
            selectedPlayer: player,
            issModalOpen: true
        });
    }

    handleCloseModal = () => {
        this.setState({
            selectedPlayer: undefined,
            issModalOpen: false
        });
    }


    render() {
        const { filteredPlayerList, loading, newPlayerName, pagination, isSearching,selectedPlayer, issModalOpen } = this.state;
        const { currentPage, playersPerPage} = pagination;

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
                        {!loading
                            ? <Table stickyHeader aria-label="sticky table" className="table-main">
                                <TableHead className="TableHead_Custom">
                                    <TableRow>
                                        <TableCell className="TableCell_PlayerId">Player id</TableCell>
                                        <TableCell className="TableCell_Player_Name">Player name</TableCell>
                                        <TableCell className="TableCell_Actions">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                {filteredPlayerList.length > 0
                                    ? <PlayersList
                                        playersList={filteredPlayerList}
                                        handleUpdate={this.handleUpdate}
                                        handleDelete={this.handleOpenModal}
                                    />
                                    : <TableRow className="TableRow_Custom">
                                        <TableCell className="TableCell_WithoutData" colSpan={8}>
                                            No players available
                                        </TableCell>
                                    </TableRow>
                                }
                                
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell className="Pagination_TableCell" colSpan={1}>
                                            <PaginationNavBar
                                                paginate={this.handlePaginate}
                                                playersPerPage={playersPerPage}
                                                currentPage={currentPage}
                                                isSearching={isSearching}
                                                handlePerPageChange={this.handlePerPageChange}
                                                hasNextPage={getHasNextPage(pagination)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                            : <SkeletonLoader />
                        }
                    </TableContainer>

                    {issModalOpen && selectedPlayer &&
                        <DeleteConfirmationModal
                            handleCloseModal={this.handleCloseModal}
                            handleDeletePlayer={this.handleRowDelete}
                            open={issModalOpen}
                            player={selectedPlayer}
                        />
                    }
                </Box>
            </Box>
        );
    }
}

export default PlayersManagement;