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
import history from "../history";
import { deletePlayerApi, DeletePlayerApiResponse } from '@api/players_management/deletePlayer';
import toast from 'react-hot-toast';
import SkeletonLoader from "@components/common/TableCellLoader";
import AppHeader from '@components/AppHeader';
import _debounce from 'lodash-es/debounce';

interface ApplicationState {
    loading: boolean;
    playersList: Player[];
    filteredPlayerList: Player[]
}

class StoreManagement extends Component<{}, ApplicationState> {
    constructor(props: any) {
        super(props)

        this.state = {
            playersList: [],
            filteredPlayerList: [],
            loading: false
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
        const { filteredPlayerList, loading } = this.state;
     
        return (
            <Box 
                boxShadow="0 15px 17px 0 rgb(0 0 0 / 16%), 0 15px 17px 0 rgb(0 0 0 / 12%)" 
                border="1px black solid" 
                borderRadius="8px" 
                p={2} 
                mt={2}
            >
                <AppHeader handleSearch={this.handleSearch} handleAddStore={this.handleAddStore} />
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
                                        handleRowClick={this.handleRowClick}
                                        handleRowDelete={this.handleRowDelete}
                                    />
                                }

                                {filteredPlayerList && filteredPlayerList.length === 0 &&
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
            </Box>
        );
    }
}

export default StoreManagement;