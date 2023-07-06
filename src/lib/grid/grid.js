import { COLS, ROWS } from "../../config/spreadSize";

export class Grid {
    constructor() {
        this.matrix = {};
    }

    _getKey([x, y]) {
        return `${x},${y}`;
    }

    setAt(coord, value) {
        const key = this._getKey(coord);
        if (value === '' || value === undefined || value === null) {
            delete this.matrix[key];
            return;
        }
        this.matrix[key] = value;
    }

    getAt(coord) {
        return this.matrix[this._getKey(coord)];
    }

    getValues(coords) {
        return coords.map(coord => this.getAt(coord));
    }

    getCoordsWithValues() {
        return Object.keys(this.matrix).map(
            key => key.split(',').map(c => Number(c))
        );
    }
    toCSVBlob() {
        let res = "";
        for (let col = 0; col < COLS; col++) {
            for (let row = 0; row < ROWS; row++) {
                res += this.getAt([col, row])?.value || "null";
                if (row < ROWS - 1) res += ",";
            }
            res += "\n";
        }
        return new Blob([res], { type: "text/csv" });
    }

}
