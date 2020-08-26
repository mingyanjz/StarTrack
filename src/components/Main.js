import React, { Component } from 'react'
import SatSetting from './SatSetting'
import SatList from './SatList'
import WorldMap from './WorldMap'
import { NEARBY_SATELLITE, STARLINK_CATEGORY, TRACK_SATELLITE } from '../constant/constant';
import {SAT_API_KEY} from '../private/key'
import Axios from 'axios';
class Main extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            loadTracking: false,
            selected: [],
            satPositions: [],
            curTime: 0,
        }
    }
    updateSelected = (item, status) => {
        let {selected: list} = this.state;
        const found = list.some(entry => entry.satid === item.satid);
        if (status && !found) {
            list = [...list, item];
        }
        if (!status && found) {
            list = list.filter(entry => entry.satid !== item.satid);
        }
        this.setState({
            selected: list,
        });
        // console.log(list);
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
                    setting: setting,
                });
            })
            .catch(error => {
                this.setState({
                    loading: false,
                }); 
                console.log('err in fetch satellite -> ', error);
            })
    }
    trackSatellites = (duration) => {
        const { observerLat, observerLon, observerAlt } = this.state.setting;
        const seconds = duration * 60;
        this.setState({
            loadTracking: true,
        }); 
        const responses = this.state.selected.map(entry => {
            const {satid} = entry;
            const url = `${TRACK_SATELLITE}/${satid}/${observerLat}/${observerLon}/${observerAlt}/${seconds}/&apiKey=${SAT_API_KEY}`;
            return Axios.get(url);
        })
        
        Axios.all(responses)
            .then(Axios.spread((...args) => {
                return args.map(item => item.data)
            })).then(res => {
                res.map(entry => {
                    entry.trace = entry.positions.map(({satlatitude, satlongitude}) => [satlongitude, satlatitude])
                });
                this.setState({
                    loadTracking: false,
                    satPositions: res,
                });
                this.track();
            })
            .catch(error => {
            this.setState({
                loadTracking: false,
            }); 
            console.log('err in fetch satellite -> ', error);
        })
        
    }
    track = () => {
        // console.log(this.state.satPositions);
        const timestep = 6;
        const startTime = 0;
        this.setState({
            curTime: 0,
        });
        let curTime = startTime ;
        const totalTime = this.state.satPositions[0].positions.length;
        
        let timer = setInterval( () => {
            if (curTime >= totalTime) {
                return;
            }  
            this.setState({
                curTime: curTime,
            });
            curTime += timestep;
        }, 100)
       
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
                        selected={this.state.selected}
                        updateSelected={this.updateSelected}
                        trackSatellites={this.trackSatellites}
                    />
                </div>
                <div className="right-part">
                    <WorldMap
                        // refMap={this.refMap}
                        loading={this.state.loadTracking}
                        satPositions={this.state.satPositions}
                        curTime={this.state.curTime}
                    />
                </div>
            </div>
        )
    };
}
export default Main;