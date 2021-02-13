import { getCurrentPlayersList } from '../utils/getCurrentPlayersList';
import { getHasNextPage } from '../utils/getHasNextPage';
import { getIsSelectedRow } from '../utils/getIsSelectedRow';
import { handleErrorMessage } from '../api/utils/handleErrorMessage';

const playersList = [
  { id: "1234", name: "check first test" },
  { id: "1235", name: "check second test" },
  { id: "1236", name: "check third test" },
  { id: "1237", name: "check fourth test" },
  { id: "1237", name: "check fith test" },
  { id: "1237", name: "check sixth test" }
];


describe("Return current page players", () => {
  test("it should return the players of selected page ", () => {
    const pageNumber = 2;
    const playersPerPage = 5;

    const output = [{ id: "1237", name: "check sixth test" }];

    expect(getCurrentPlayersList(pageNumber, playersPerPage, playersList)).toEqual(output);

  });
});

describe("Return if has a next page", () => {
  test("it should return a boolean regarding the next page", () => {
    const pagination = {
      playersPerPage: 10,
      currentPage: 1,
      totalResults: 8
    };

    const output = false;

    expect(getHasNextPage(pagination)).toEqual(output);

  });
});

describe("Return if row is on edit mode", () => {
  test("it should return boolean value edit mode", () => {
    const isEditMode = true;
    const selectedRow = "1";
    const id = "1";

    const output = true;

    expect(getIsSelectedRow(isEditMode, selectedRow, id)).toEqual(output);

  });
});

describe("Return error of api call", () => {
  test("it should return a normalized message from rejected request", () => {
    const responseApiOne = {
      error_code: ["Something went wrong please try again"]
    };

    const outputOne = "Something went wrong please try again";

    expect(handleErrorMessage(responseApiOne)).toEqual(outputOne);
  });

  test("it should return a normalized message from rejected non field errors", () => {
    const responseApiTwo = {
      non_field_errors: ["Something went wrong , contact administrator"]
    };

    const outputTwo = "Something went wrong , contact administrator";

    expect(handleErrorMessage(responseApiTwo)).toEqual(outputTwo);
  });

  test("it should return a normalized message response data object", () => {
    const responseApiThree = {
      response: {
        data: {
          non_field_errors: ["Object has some problems"]
        }
      }
    };

    const outputThree = "Object has some problems";

    expect(handleErrorMessage(responseApiThree)).toEqual(outputThree);
  });
});