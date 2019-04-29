import React from 'react'
import '../styles/Cell.css'

function Cell (props) {
    let cellStatus = '';
    switch(props.cell) {
        case 0:
            cellStatus = '';
            break;
        case 1:
            cellStatus = 'fill';
            break;
        case 2:
            cellStatus = 'active';
            break;
        default: break;
    }
    return (
        <div className={'cell ' + cellStatus}></div>
    )
}

export default Cell
