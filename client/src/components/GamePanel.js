import React from 'react';
//import styled from 'styled-components';
import GameGrid from './GameGrid';


/**
 * Function React.js component for main game panel
 */
function GamePanel(props) {
    return (
        <div>
            <GameGrid socket={props.socket}/>
        </div>
    )
}

export default GamePanel;