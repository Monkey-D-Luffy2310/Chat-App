import React from "react";
import { Collapse, Button, Typography } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { AppContext } from "../../Context/AppProvider";

const PanelStyled = styled(Collapse.Panel)`
  &&& {
    .ant-collapse-header {
      color: white;
      padding-bottom: 0;
    }
    .ant-typography {
      display: block;
      margin: 10px 17px;
    }
    .ant-typography:first-child {
      margin-top: 0;
    }
    .ant-collapse-content {
      padding-left: 7px;
    }
    .ant-btn {
      color: white;
      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

const RoomList = () => {
  const { setIsVisibleAddRoom, setSelectedRoomId, rooms } =
    React.useContext(AppContext);
  function handleAddRoom() {
    setIsVisibleAddRoom(true);
  }

  function handleSelectRoom(roomId) {
    setSelectedRoomId(roomId);
  }
  return (
    <Collapse ghost bordered={false} defaultActiveKey={["1"]}>
      <PanelStyled header="Danh sách các phòng" key="1">
        <div>
          {rooms.map((room) => (
            <Typography.Link
              key={room.id}
              onClick={() => handleSelectRoom(room.id)}
            >
              {room.name}
            </Typography.Link>
          ))}
        </div>
        <Button
          type="text"
          onClick={handleAddRoom}
          icon={<PlusSquareOutlined />}
        >
          Thêm phòng
        </Button>
      </PanelStyled>
    </Collapse>
  );
};

export default RoomList;
