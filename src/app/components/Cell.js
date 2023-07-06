import React, { useCallback, useEffect, } from 'react';
import { connect } from 'react-redux';
import useSaveMutation from '../api/useSaveMutation';
import { updateCell, updateSelection, updateSaving } from '../store/actions';

export const Cell = (props) => {

    const onSuccess = () => {
        console.log("Data Save Successfully")
    };
    const onError = () => {
        console.log("Error ocurred while saving data");
        console.log("refetching...");
        saveTrigger();
    }
    const { mutate, isLoading } = useSaveMutation({ onSuccess, onError });
    useEffect(() => {
        props.updateSaving(isLoading);
    }, [isLoading])
    const getValue = useCallback(() => {
        const cell = props.cell;
        const editing = props.isEditing;
        if (!cell) {
            return '';
        }
        if (editing) {
            return cell.input;
        }
        if (cell.error) {
            return '##ERROR';
        }
        return cell.value;
    }, [props.cell, props.isEditing]
    )
    function getTitle() {
        const { cell, id } = props;
        return cell && cell.error ? `Error: ${cell.error}` : id;
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            // Perform desired action when Enter key is pressed
            props.updateSelection(props.row + 1);
        }
    };
    const handleDoubleClick = (event) => {
        // Perform desired action on double click   
        props.updateSelection(props.row);
    };
    const { row, col, id, updateCell, updateSelection } = props;
    const saveTrigger = async () => {
        const csvData = props.grid.toCSVBlob();
        console.log(csvData);
        console.log("saving data...");
        mutate(csvData);
    }
    return (
        <div className={`relative ${props.className}`}
            onKeyDown={handleKeyDown}
            onDoubleClick={handleDoubleClick} title={getTitle()} data-cell={id}>
            <input
                className={props.inputClass}
                value={getValue()}
                onChange={(e) => updateCell({
                    input: e.target.value,
                    coord: [col, row]
                })}
                onBlur={() => saveTrigger()}
                disabled={!props.isEditing}
            />
            <button onClick={() => updateSelection(row)}>
                <img src="/assets/editIcon.svg" alt="edit" className="absolute top-1/2 right-1 transform-translate-y-1/2" />
            </button>
        </div >
    );
}

const mapStateToProps = ({ grid, selection }, { row, col }) => ({
    cell: grid.getAt([col, row]),
    grid,
    selection,
    isEditing: selection === row
});

const mapDispatchToProps = { updateCell, updateSelection, updateSaving };

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
