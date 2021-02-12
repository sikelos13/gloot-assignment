import PlayersList from "../../../components/players_management/PlayersList";
import * as React from 'react';
import { shallow } from 'enzyme';
import { TableCell } from "@material-ui/core";

const playersList = [
    { id: "1234", name: "check first test" },
    { id: "1235", name: "check second test" },
    { id: "1236", name: "check third test" },
    { id: "1237", name: "check fourth test" }
];
const PlayersListProps = {
    playersList: playersList,
    handleUpdate: () => {
        console.log('deleted')
    },
    handleDelete: () => {
        console.log('selected')
    }
}

describe("Players list container renders", () => {
    it('renders with props when passed in', () => {

        const result = shallow(<PlayersList {...PlayersListProps} />).contains(<TableCell />);
        expect(result).toMatchSnapshot();
    });

    it('finds the right div for mounting the players list', () => {

        const container = shallow(<PlayersList {...PlayersListProps} />);

        expect(container.find('div#table-row')).toBeTruthy();
    });
});