import PlayersManagement from "../../containers/PlayersManagement";
import * as React from 'react';
import { shallow, mount } from 'enzyme';
import PlayersList from "../../components/players_management/PlayersList";
import { Player } from "../../api/types/Players";

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

//   it('should take a search value and return filtered notes', () => {

//     const event = {
//       target: {
//         value: "test search"
//       }
//     }

//     const wrapper = shallow(<ApplicationBase />);
//     expect(wrapper.state('searchValue')).toBe("");
//     (wrapper.instance() as ApplicationBase).handleSearch(event);
//     expect(wrapper.state('filteredPlayerList')).not.toBeNull();
//   });

//   it('should return new array with one more player', () => {

//     const wrapper = shallow(<ApplicationBase />);
//     wrapper.setState({ filteredPlayerList: playersList })
//     expect(wrapper.state('filteredPlayerList')).toHaveLength(4);
//     (wrapper.instance() as ApplicationBase).handleAddPlayer();
//     (wrapper.instance() as ApplicationBase).handleAddPlayer();
//     expect(wrapper.state('filteredPlayerList')).toHaveLength(4);
//   });


//   it('should return new array with one less player', () => {

//     const wrapper = shallow(<ApplicationBase />);


//     expect(wrapper.state('filteredPlayerList')).toHaveLength(4);
//     (wrapper.instance() as ApplicationBase).handleAddPlayer();
//     (wrapper.instance() as ApplicationBase).handleAddPlayer();

//     const randomPlayerList = (wrapper.state('filteredPlayerList') as Player[]);
//     (wrapper.instance() as ApplicationBase).handleRowDelete(randomPlayerList[0].id);
//     const updatedNotesList = (wrapper.state('filteredPlayerList') as Player[]);
//     expect(updatedNotesList.length).toBeGreaterThan(3);
//   });
});