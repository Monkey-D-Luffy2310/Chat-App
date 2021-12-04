import React from 'react';
import SideBar from './SideBar';
import ChatWindows from './ChatWindows';
import { Row, Col } from 'antd';

const ChatRoom = () => {
  return (
    <div>
      <Row>
        <Col span={6}>
          <SideBar></SideBar>
        </Col>
        <Col span={18}>
          <ChatWindows></ChatWindows>
        </Col>
      </Row>
    </div>
  );
}

export default ChatRoom;
