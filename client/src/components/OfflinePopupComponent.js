import React, {Component} from 'react';
import '../styles/Popup.css';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

class OfflinePopup extends Component {
    
    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <header className="header">
				        <div>Sorry!</div>
			        </header>
                    <div className="error">
                        <h4>Your partner disconnected.</h4>
                    </div>
                    <Link to={`/home`}>
                        <Button id="home" color="primary">
                           Return Home
                        </Button>
                    </Link>
                </div>
            </div>
        
      );
    }
  }

  export default OfflinePopup;