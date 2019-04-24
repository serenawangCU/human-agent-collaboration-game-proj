import React, {Component} from 'react';

class CanvasComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //this.index;
            //number of things
        }

        //percentile = math
    }

    componentDidMount() {
        this.updateCanvas();
    }
    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        const grd = ctx.createLinearGradient(0,0,500,30);
        grd.addColorStop(0,"white");
        grd.addColorStop(1,"black");

        ctx.fillStyle = grd;
        ctx.fillRect(10,10,380,30);
        
        ctx.fillStyle = "blue";
        ctx.font = "18px Verdanda";
        ctx.fillText("X",190,30); //(380*percentile)
    }
    render() {
        return (
            <canvas ref="canvas" width={400} height={100}/>
        );
    }
}

export default CanvasComponent;