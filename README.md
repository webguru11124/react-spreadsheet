
![Alt Text](https://github.com/webguru11124/react-spreadsheet/blob/main/Peek%202023-07-07%2006-12.gif)

# Spreadsheet with React


![Quicksheets screencast](screencast.gif)

## How it works

When a cell on the spreadsheet is updated, all the non-empty cells
are parsed and evaluated and updated with their new values (or errors). It has plenty of room for optimization but should be good enough for a sparse 3x26 grid.

### Code organisation

- `src`
  - `app`: contains all the UI code, based on React and Redux
  - `lib`: contains the modules implementing the core spreadsheet engine
    - `eval`: modules responsible for parsing and evaluating formulae and expressions
    - `functions`: implementations of the functions available in the spreadsheet (e.g. SUM, PRODUCT, etc.)
    - `grid`: abstractions for working with 2-D grids
    - `spreadsheet.js`: implements the `Spreadsheet` class that encapsulate the entire spreadsheet engine

Unit tests are located in `tests` folders in the various subfolders under the `src` directory.
E2E tests are located in `cypress/integration` directory.

## Available Scripts

### run server

docker pull stakingrewards/engineering-frontend-challenge:latest

docker run --name fe-challenge -d -p 8082:8081 stakingrewards/engineering-frontend-challenge:latest

### run clinet

nvm use 16

npm start

