import React, {Component} from 'react'
import {InputNumber, Button} from 'antd'
class SatSetting extends Component {
    constructor() {
        super();
        this.state = {
            observerLat: 0,
            observerLon: 0,
            observerAlt: 0,
            observerRadius: 90,
        }


    }
    onChangeLon = (value) => {
        this.setState({
            observerLon: value
        })
        // console.log('Longitude value ', value);
    }
    onChangeLat = (value) => {       
        this.setState({
            observerLat: value
        })
        // console.log('Latitude value ', value);
    }
    onChangeAlt = (value) => {    
        this.setState({
            observerAlt: value
        })
        // console.log('Altitude value', value);
    }
    onChangeRadius = (value) => {    
        this.setState({
            observerRadius: value
        })
        // console.log('Radius value', value);
    }
    showSatellites = () => {
        this.props.onShowSatellites(this.state);
        // console.log('Config ', this.state);
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
                            <label>Altitude (meters): </label>
                            <InputNumber
                                min={-413}
                                max={8850}
                                defaultValue={0}
                                style={{margin: "0 2px"}}
                                onChange={this.onChangeAlt}
                            />
                        </div>
                    </div>
                    <p className="setting-label">Restrictions</p>
                    <div className="setting-list">
                        <label>Search radius (θ): </label>
                        <InputNumber
                            min={0}
                            max={90}
                            defaultValue={90}
                            style={{margin: "0 2px"}}
                            onChange={this.onChangeRadius}
                        />
                    </div>
                    <div className="search-satellites">
                        <Button
                            className="search-satellites-btn"
                            // type="primary"
                            size="large"
                            onClick={this.showSatellites}
                        >
                            Search for satellites
                        </Button>
                    </div>
                </div>
            </div>

        )
    }
}
export default SatSetting;