import React, {Component} from 'react';
import './Popup.css';
import { NavLink } from 'react-router-dom';

class Popup extends Component {
    
    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    {this.props.popupType === 'offline'?
                        <div>
                            <h1>Your partner's offline</h1>
                            <NavLink to="/home">Return Home</NavLink>
                        </div>
                        : null
                    }

                </div>
            </div>
        
      );
    }
  }

  export default Popup;