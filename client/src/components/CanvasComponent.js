import React, {Component} from 'react';

class CanvasComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //this.index;
            //number of things
        }

        this.percentile = (this.props.totalScoreRanking-0.5) / this.props.numberOfGamesInDB;
    }

    componentDidMount() {
        this.updateCanvas();
    }
    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        const grd = ctx.createLinearGradient(0,0,500,50);
        grd.addColorStop(0,"white");
        grd.addColorStop(1,"black");

        ctx.fillStyle = grd;
        ctx.fillRect(10,10,380,30);
        
        ctx.fillStyle = "blue";
        ctx.font = "18px Verdanda";
        ctx.fillText("X", 380 * this.percentile, 30); //(380*percentile)
        console.log(this.percentile);
        ctx.textAlign = "center";
        ctx.fillStyle = "red";
        ctx.font = "14px Verdanda";
        ctx.fillText("0%", 17, 10);
        ctx.fillText("50%",200, 10);
        ctx.fillText("100%", 380, 10);
    }
    render() {
        return (
            <div>
                <canvas ref="canvas" width={400} height={50}/>
            </div>
        );
    }
}

export default CanvasComponent;
