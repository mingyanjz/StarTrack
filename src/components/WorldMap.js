import React, { Component } from 'react';
import { ComposableMap, Geographies, Geography, Graticule, Marker, Line } from "react-simple-maps";
import { GEO_URL } from "../constant/constant";
import { Spin, Slider, Button } from 'antd';
class WorldMap extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    onChangeCurTime = (value) => {
        this.props.changeCurTime(Math.round( value * 60));
    }
    
    render() {
        let duration = this.props.satPositions.length !== 0 ? this.props.satPositions[0].positions.length : 0;
        let durationInMin = duration / 60;
        let curTimeInMin = this.props.curTime / 60;
        let curTime = Math.min(this.props.curTime, duration - 1);
        
        return (
            <div className="map-box">
                {this.props.satPositions.length !== 0 ?
                    <div className="map-slider">
                        <p className="slider-label">Tracking duration (mins)</p>
                        <div className="slider">
                        <Slider
                            
                            marks={{
                                0: '0',
                                [durationInMin]: durationInMin,
                            }}
                            step={0.1}
                            min={0}
                            max={durationInMin}
                            value={curTimeInMin }
                            onChange={this.onChangeCurTime}
                        />
                        </div>
                        <div className="pause">
                        <Button 
                            className="pause-btn"
                            type="primary" 
                            onClick={() => this.props.tracking ? this.props.pauseTracking() : this.props.continueTracking()}
                        >
                            {this.props.tracking ? "Pause" : (curTimeInMin !== durationInMin ? "Continue" : "Restart")}
                        </Button>
                        </div> 
                    </div> : <></>
                }


                <ComposableMap
                    className="map"
                    width={960}
                    height={600}
                    projectionConfig={{ scale: 147 }
                    }>
                    <Graticule stroke="rgba(220, 220, 220, 1)" />
                    <Geographies geography={GEO_URL}>
                        {({ geographies }) =>
                            geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />)
                        }
                    </Geographies>
                    {
                        this.props.setting ?
                            <Marker coordinates={[this.props.setting.observerLon, this.props.setting.observerLat]}>
                                <g
                                    fill="none"
                                    stroke="#FF5533"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    transform="translate(-12, -24)"
                                >
                                    <circle cx="12" cy="10" r="3" />
                                    <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                                </g>
                                <text textAnchor="middle" fill="#F53" y={20}>
                                    Observer
                                </text>
                            </Marker> : <></>
                    }
                    {duration && curTime < duration && curTime >= 0 ?
                        this.props.satPositions.map(item =>
                            <Marker key={item.info.satid} coordinates={item.trace[curTime]}>
                                <circle r={4} fill={item.color} />
                                <text textAnchor="middle" fill="#F53" y={20}>
                                    {item.info.satname.match(/\d+/g).join('')}
                                </text>
                            </Marker>
                        ) : <></>

                    }
                    {duration && curTime < duration && curTime >= 0 ?
                        this.props.satPositions.map(item =>
                            <Line
                                key={item.info.satid}
                                coordinates={item.trace.slice(Math.max(curTime - 1200, 0), curTime)}
                                stroke={item.color}
                                strokeWidth={2}
                            />
                        ) : <></>

                    }
                </ComposableMap>
                {
                    this.props.tracking ?
                        <Spin className="spinner-tracking" tip="Tracking satellites..." /> : <></>
                }
                {
                    this.props.loading ?
                        <Spin className="spinner-loading" tip="Loading satellites information..." /> : <></>
                }
                {
                    this.props.realTime ?
                        <div className="map-time">
                            {this.props.realTime.toString()}
                        </div> : <></>
                }

            </div>
        )
    }
}
export default WorldMap;
