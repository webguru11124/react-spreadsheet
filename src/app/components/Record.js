import React, { useMemo } from "react";
import { indexCoordToAlpha } from '../../lib';
import { connect } from "react-redux";
import { cx } from '@emotion/css';
import Cell from "./Cell";


const Record = ({ row, cols, error, isShown, isEditing }) => {
    const cells = useMemo(() => Array(cols).fill(null).map((_, col) => {
        const id = indexCoordToAlpha([col, row]);
        return <Cell
            inputClass={
                `w-full bg-transparent bg-current h-7 text-xs  outline-none   text-center`
            }
            className={cx(" h-7 ", {
                "rounded-l": col === 0,
                "rounded-r": col === 2,
                "border border-x border-primary": col === 1
            })}
            key={`Cell-${id}`}
            id={id}
            row={row}
            col={col}
        />
    }), [row, cols])
    return isShown && <div className={cx("grid grid-cols-3 divide-y-0 py-0.5  bg-secondary", {
        "border-2 border-danger bg-danger-light": error,
        "shadow": isEditing
    })}> {cells}
    </div >
}
const mapStateToProps = ({ grid, selection, search }, { row, cols }) => {
    const childValues = Array(cols).fill(null).map((_, col) => grid.getAt([col, row]));
    return {
        error: childValues.reduce((r, v) => r | v?.error != null, false),
        isShown: search === "" || (search !== "" && childValues.filter(v => v?.value && v.value.toString().includes(search)).length > 0),
        selection,
        isEditing: (selection === row)
    }
};


export default connect(mapStateToProps)(Record);