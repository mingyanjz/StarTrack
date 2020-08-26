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
            <div>
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
                        this.props.satPositions.map(item =>
                            <Marker key={item.info.satid} coordinates={item.trace[this.props.curTime]}>
                                <circle r={8} fill="#F53" />
                                <text textAnchor="middle" fill="#F53" y={20}>
                                    {item.info.satname.slice(-4)}
                                </text>
                            </Marker>
                        )

                    }
                    {
                        this.props.satPositions.map(item =>
                            <Line
                                coordinates={item.trace.slice(0,this.props.curTime)}
                                stroke="#F53"
                                strokeWidth={2}
                            />
                        )

                    }
                </ComposableMap>
                {
                    this.props.loading ?
                        <Spin tip="Loading satellites information..." /> : <></>
                }
            </div>
        )
    }
}
export default WorldMap;
