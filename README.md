## G-Loot Assignment

G-Loot Assignment is a simple crud web app using React, Node.js and Express.
## Build With

* [React](https://reactjs.org/)
* [Material UI](https://material-ui.com/)
* [Create-react-app with Typescript template](https://create-react-app.dev/docs/adding-typescript/)
* [G-Loot Node.js and Express API](https://github.com/g-loot/frontend-assignment)
### Prerequisites

The server API is running using Node.js and Express. 

**Clone G-Loot Repository for the Express Server**

```
git clone frontend-assignment
cd frontend-assignment
npm install && npm run start
```
### Hot to run 

After installing and run the G-Loot server follow the commands below to start the project in development.
```
cd gloot-assignment
npm install
npm run start
```

### Features implemented
* Search field with on change search action
* If search results are null disable the editor
* If user deletes the currently selected note it will automatically select the next from the top of the list
* Delete notes from list easily with one click
* Delete notes from filtered list after search action
* Create note
* Notes that are being edit will be automatically saved on the fly
* Notes will be persisted in localStorage of user's browser
* Markdown parser implemented with [React Markdown](https://github.com/rexxars/react-markdown)
* Project has been Dockerized 

### Testing build with

* [Jest for React](https://jestjs.io/)
* [Enzyme for jest](https://enzymejs.github.io/enzyme/)

### Testing

For testing i have used jest framework together with enzyme to render components.
To run the test type:

```
npm test
```

To run test with coverage run:

```
npm test -- --coverage
```

