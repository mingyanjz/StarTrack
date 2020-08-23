import React, { Component } from 'react'
import SatSetting from './SatSetting'
import SatList from './SatList'
import { NEARBY_SATELLITE, STARLINK_CATEGORY } from '../constant/constant';
import {SAT_API_KEY} from '../private/key'
import Axios from 'axios';
class Main extends Component {
    constructor() {
        super();
        this.state = {
            loading: false
        }
    }
    onShowSatellites = (setting) => {
        this.searchSatellites(setting);
    }
    searchSatellites = (setting) => {
        const { observerLat, observerLon, observerAlt, observerRadius } = setting;
        const url = `${NEARBY_SATELLITE}/${observerLat}/${observerLon}/${observerAlt}/${observerRadius}/${STARLINK_CATEGORY}/&apiKey=${SAT_API_KEY}`;
        console.log('sending request');
        this.setState({
            loading: true,
        });
        Axios.get(url)
            .then(res => {
                this.setState({
                    satInfo: res.data,
                    loading: false,
                });
            })
            .catch(error => {
                this.state = {
                    loading: false,
                }
                console.log('err in fetch satellite -> ', error);
            })
    }
    render() {
        return (
            <div className="main">
                <div className="left-part">
                    <SatSetting
                        onShowSatellites={this.onShowSatellites}
                    />
                    <SatList 
                        satInfo={this.state.satInfo}
                        loading={this.state.loading}
                    />
                </div>
                <div className="right-part">
                    This is my right;
                </div>
            </div>
        )
    };
}
export default Main;