import React, { Component } from 'react'
import { Button } from 'antd'
import { List, message, Avatar, Checkbox, Spin, InputNumber } from 'antd';
import Satellite from "../assets/images/Satellite_a.svg"
import SatelliteSelected from "../assets/images/Satellite_c.svg"
class SatList extends Component {
    constructor(){
        super();
        this.state = {
            duration: 30,
        }
    }
    onChangeDuration = value => {
        this.setState({
            duration: value,
        })
        console.log(value);
    }
    onChange = entry => {
        let item = entry.target.dataInfo;
        let status = entry.target.checked;
        this.props.updateSelected(item, status);
    }

    render() {
        const satList = this.props.satInfo ? this.props.satInfo : [];
        // console.log(this.props.satInfo);
        return (
            <div className="satellite-box">
                <Button
                    className="start-tracking-btn"
                    size="large"
                    disabled={this.props.selected.length===0 || this.props.selected.length>20 || this.props.loadTracking || this.props.tracking}
                    onClick={() => this.props.trackSatellites(this.state.duration)}
                >
                    Start tracking on map
                </Button>
                <div className="set-duration">
                            <label>Track Duration (mins): </label>
                            <InputNumber
                                disabled={satList.length===0}
                                placeholder="duration"
                                max={90}  
                                min={5}
                                defaultValue={30}
                                style={{margin: "0 2px"}}
                                onChange={this.onChangeDuration}
                            />
                        </div>
                <hr />
                {
                    this.props.loading ?
                        <Spin tip="Loading satellites information...">
                        </Spin> :
                        <List
                            className="sat-list"
                            dataSource={satList}
                            itemLayout="horizontal"
                            size="small"
                            renderItem={item => (
                                <List.Item
                                    key={item.satid}
                                    actions={[
                                        <Checkbox
                                            className="sat-checkbox"
                                            dataInfo={item}
                                            onChange={this.onChange}
                                        />
                                        // <a key="list-loadmore-edit">edit</a>
                                    ]}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                className="sat-log"
                                                size={50}
                                                src={this.props.selected.some(entry => entry.satid === item.satid) ? SatelliteSelected : Satellite}
                                            />
                                        }
                                        title={<p>{item.satname}</p>}
                                        description={`Launch Date: ${item.launchDate}`}
                                    />
                                </List.Item>
                            )}
                        />
                }
            </div>
        )
    }
}

export default SatList;

