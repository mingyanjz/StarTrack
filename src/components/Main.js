import React, {Component} from 'react'
import SatSetting from './SatSetting'
class Main extends Component {
    render(){
        return (
            <div className="main">
                <div className="left-part">
                    <SatSetting/>   
                </div>              
                <div className="right-part">
                    This is my right;
                </div>
            </div>
        )
    };
}
export default Main;