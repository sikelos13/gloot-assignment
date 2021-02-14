import PlayersManagement from "../../containers/PlayersManagement";
import * as React from 'react';
import { shallow, mount } from 'enzyme';
import PlayersList from "../../components/players_management/PlayersList";
import { Player } from "../../api/types/Players";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
// import PlayersManagement from "../../containers/PlayersManagement";
import { fetchPlayersApi, FetchPlayersApiResponse} from '../../api/players_management/fetchPlayers';

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

describe("Application container renders", () => {
  it('renders children when passed in', () => {
    const result = shallow((
      <PlayersManagement>
        <div className="unique" />
      </PlayersManagement>
    ));

    expect(result).toBeTruthy();
  });

  it('should render list component', () => {

    const wrapper = mount(<PlayersList {...PlayersListProps} />);
    expect(wrapper.find(PlayersList).length).toEqual(1);

  });
});