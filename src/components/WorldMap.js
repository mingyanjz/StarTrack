import React, { Component } from 'react';
import { ComposableMap, Geographies, Geography, Graticule } from "react-simple-maps";
import {GEO_URL} from "../constant/constant";

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
                width = {960}
                height = {600}
                projectionConfig={{ scale: 147 }
                }>
                    <Graticule stroke="rgba(220, 220, 220, 1)" />
                    <Geographies geography={GEO_URL}>
                        {({ geographies }) =>
                            geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />)
                        }
                    </Geographies>
                </ComposableMap>
            </div>
        )
    }
}
export default WorldMap;
