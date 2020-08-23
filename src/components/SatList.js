import React, { Component } from 'react'
import { Button } from 'antd'
import { List, message, Avatar, Checkbox, Spin } from 'antd';
import Satellite from "../assets/images/Satellite_a.svg"
class SatList extends Component {
    render() {
        const satList = this.props.satInfo ? this.props.satInfo.above : [];
        console.log(this.props.satInfo);
        return (
            <div className="satellite-box">
                <Button
                    className="start-tracking-btn"
                    size="large"
                >
                    Start tracking on map
                </Button>
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
                                                src={Satellite}
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

