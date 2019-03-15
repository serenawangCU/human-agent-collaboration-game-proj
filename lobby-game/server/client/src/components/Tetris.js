import React from 'react';
import GamePanel from './GamePanel';
//import GameInfo from './GameInfo';
import styled from 'styled-components';

const Left = styled.div`
display: inline-block;
vertical-align: top;
margin-left: 30%;
padding-top: 10px;
`;

// const Right = styled.div`
// display: inline-block;
// vertical-align: top;
// margin-right: 20%;
// padding-top: 20px;
// `;


const Tetris = () => (
    <div>
        <Left>
            <GamePanel />
        </Left>
        {/* <Right>
            <GameInfo />
        </Right> */}
    </div>
);

export default Tetris;