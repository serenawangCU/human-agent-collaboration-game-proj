import React from 'react'
import Cell from './Cell'

function Row1(props) {
    return (
        <div className="row">
            {props.row.map((cell, i) =>
                <Cell key={i} cell={cell}/>
            )}
        </div>
    )
}

export default Row1
