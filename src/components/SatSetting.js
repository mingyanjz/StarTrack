import React, {Component} from 'react'
import {InputNumber} from 'antd'
class SatSetting extends Component {
    constructor() {
        super();
        this.state = {
            observerLat: 0,
            observerLon: 0
        }


    }
    onChangeLon = (value) => {
        this.setState({
            observerLon: value
        })
        console.log('Longitude value ', this.state.observerLon);
    }
    onChangeLat = (value) => {
        
        this.setState({
            observerLat: value
        })
        console.log('Latitude value ', this.state.observerLat);
    }
    render() {
        return (
            <div className="sat-setting">
                <div className="loc-setting">
                    <p className="setting-label">From localtion</p>
                    <div className="setting-list two-item-col">
                        <div className="list-item set-left">
                            <label>Longitude:</label>
                            <InputNumber
                                placeholder="longitude"
                                max={180}  
                                min={-180}
                                defaultValue={0}
                                style={{margin: "0 2px"}}
                                onChange={this.onChangeLon}
                            />
                        </div>
                        <div className="list-item set-right">
                            <label>Latitude:</label>
                            <InputNumber
                                placeholder="latitude"
                                max={90}  
                                min={-90}
                                defaultValue={0}
                                style={{margin: "0 2px"}}
                                onChange={this.onChangeLat}
                            />
                        </div>
                    </div>
                    <div className="setting-list">
                        <div className="list-item">
                            <label>Elevation(meters): </label>
                            <InputNumber
                                min={-413}
                                max={8850}
                                defaultValue={0}
                                style={{margin: "0 2px"}}
                            />
                        </div>
                    </div>

                </div>
            </div>

        )
    }
}
export default SatSetting;