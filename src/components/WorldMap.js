import React, { Component } from 'react';
import { ComposableMap, Geographies, Geography, Graticule, Marker, Line } from "react-simple-maps";
import { GEO_URL } from "../constant/constant";
import { Spin } from 'antd';
class WorldMap extends Component {
    constructor() {
        super();
        this.state = {
            map: null
        }
    }

    render() {
        return (
            <div className="map-box">
                <ComposableMap
                    className="map"
                    // width={960}
                    // height={600}
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
                        this.props.satPositions.map(item =>
                            <Marker key={item.info.satid} coordinates={item.trace[this.props.curTime]}>
                                <circle r={4} fill={item.color} />
                                <text textAnchor="middle" fill="#F53" y={20}>
                                    {item.info.satname.match(/\d+/g).join('')}
                                </text>
                            </Marker>
                        )

                    }
                    {
                        this.props.satPositions.map(item =>
                            <Line
                                key={item.info.satid}
                                coordinates={item.trace.slice(Math.max(this.props.curTime - 1200, 0), this.props.curTime)}
                                stroke={item.color}
                                strokeWidth={2}
                            />
                        )

                    }
                </ComposableMap>
                {
                    this.props.loading ?
                        <Spin tip="Loading satellites information..." /> : <></>
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
