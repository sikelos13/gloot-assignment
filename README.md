## G-Loot Assignment

G-Loot Assignment is a simple crud web app using React, Node.js and Express.
## Build With

* [React](https://reactjs.org/)
* [Material UI](https://material-ui.com/)
* [Create-react-app with Typescript template](https://create-react-app.dev/docs/adding-typescript/)
* [React hot toast](https://github.com/timolins/react-hot-toast)
* [Typescript](https://www.typescriptlang.org/docs/handbook/react.html)
* [Axios](https://github.com/axios/axios)
* [Axios mock adapter](https://github.com/ctimmerm/axios-mock-adapter#readme)
* [G-Loot Node.js and Express API](https://github.com/g-loot/frontend-assignment)

### Prerequisites

The server API is running using Node.js and Express. 

**Clone G-Loot Repository for the Express Server**

```
git clone frontend-assignment
cd frontend-assignment
Inside the index.js add in the function "allowCorsMiddleware" the res.header("Access-Control-Allow-Methods", "PUT,DELETE,POST");
npm install && npm run start
```

**Notice: Made an adjustment in G-loot's repository and added to the headers the "Access-Control-Allow-Methods" in order for PUT , POST and DELETE Methods to work**

If everything done correctly the server will be served at port 3000

### How to run 

After installing and run the G-Loot server follow the commands below to start the project in development.
```
cd gloot-assignment
npm install
Create on the root folder a .env file and put inside our env var which will use (REACT_APP_API_ENDPOINT="http://localhost:3000/")
npm run start
The app wiil probably ask to run in different port as the 3000 is used from the Express server. Type "y"
```

### Features implemented
* Search field with on change search action (Debounce used here)
* Delete players from list easily with one click
* Create player on the fly
* Added pagination with next and back buttons
* Calculate and delete on the fly in any page or edit
* Debounce function created for search input
* Max page number set to 10 per page but can be changed via dropdown.

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

