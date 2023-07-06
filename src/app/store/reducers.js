import spreadsheet, { initialGrid } from '../spreadsheet';
import * as types from './action-types';

function updateInput(coord, input) {
  spreadsheet.setInput(coord, input);
  return spreadsheet.evaluate();
}

export function grid(state = initialGrid, action) {
  switch (action.type) {
    case types.UPDATE_CELL:
      return updateInput(action.update.coord, action.update.input)
    default:
      return state;
  }
}

export function selection(state = null, action) {
  switch (action.type) {
    case types.UPDATE_SELECTION:
      return action.selection;
    default:
      return state;
  }
}
export function search(state = "", action) {
  switch (action.type) {
    case types.UPDATE_FILTER:
      return action.term;
    default:
      return state;
  }
}
export function saving(state = false, action) {
  switch (action.type) {
    case types.UPDATE_SAVING_PROGRESS:
      return action.saving;
    default:
      return state;
  }
}