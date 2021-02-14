import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchPlayersApi, FetchPlayersApiResponse} from '../../api/players_management/fetchPlayers';
import { deletePlayerApi, DeletePlayerApiResponse } from '../../api/players_management/deletePlayer';
import { updatePlayerApi, UpdatePlayerApiResponse } from '../../api/players_management/updatePlayer';
import { createPlayerApi, CreatePlayerApiResponse } from '../../api/players_management/createPlayer';

const playersList = [
  { id: "1234", name: "check first test" },
  { id: "1235", name: "check second test" },
  { id: "1236", name: "check third test" },
  { id: "1237", name: "check fourth test" }
]

describe('Fetch players list api', () => {
    it('returns data when fetchPlayersApi is called', done => {
        const mock = new MockAdapter(axios);
        const data = { response: playersList };
        mock.onGet(`${process.env.REACT_APP_API_ENDPOINT}players`).reply(200, data);

        fetchPlayersApi().then((response: FetchPlayersApiResponse) => {
            expect(response.data).toEqual(data);
            done();
        });
    });
});

describe('Update player name api', () => {
  it('returns data when fetchPlayersApi is called', done => {
      const mock = new MockAdapter(axios);
      const data = false;

      mock.onPut(`${process.env.REACT_APP_API_ENDPOINT}player`).reply(200, data);

      updatePlayerApi("1234", {id: '1234', name: 'new name'}).then((response: UpdatePlayerApiResponse) => {
          expect(response.success).toEqual(data);
          done();
      });
  });
});

describe('Delete player api', () => {
  it('returns data when fetchPlayersApi is called', done => {
      const mock = new MockAdapter(axios);
      const data = false;
      
      mock.onDelete(`${process.env.REACT_APP_API_ENDPOINT}player`).reply(200, data);

      deletePlayerApi('1235').then((response: DeletePlayerApiResponse) => {
          expect(response.success).toEqual(data);
          done();
      });
  });
});

describe('Create player api', () => {
    it('returns success to true if player created successfully', done => {
        const mock = new MockAdapter(axios);
        const data = true;

        const form = {
            name: "new name"
        }
        
        mock.onPost(`${process.env.REACT_APP_API_ENDPOINT}player`).reply(200, data);
  
        createPlayerApi(form).then((response: CreatePlayerApiResponse) => {
            expect(response.success).toEqual(data);
            done();
        });
    });
});