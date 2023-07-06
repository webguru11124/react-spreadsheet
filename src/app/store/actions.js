import * as types from './action-types';

export function updateCell(update) {
    return {
        type: types.UPDATE_CELL,
        update
    };
}
export function updateSelection(selection) {
    return {
        type: types.UPDATE_SELECTION,
        selection
    }
}
export function updateFilter(term) {
    return {
        type: types.UPDATE_FILTER,
        term
    }
}
export function updateSaving(saving) {
    return {
        type: types.UPDATE_SAVING_PROGRESS,
        saving
    }
}