import React, {Component} from 'react';
import '../styles/Popup.css';
import { NavLink } from 'react-router-dom';

class OfflinePopup extends Component {
    
    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <div>
                        <h1>Your partner's offline</h1>
                        <NavLink to="/home">Return Home</NavLink>
                    </div>
                </div>
            </div>
        
      );
    }
  }

  export default OfflinePopup;