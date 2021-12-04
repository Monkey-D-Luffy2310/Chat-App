import { useContext } from "react";
import { Typography, Button, Avatar, Tooltip } from "antd";
import styled from "styled-components";
import { UserAddOutlined } from "@ant-design/icons";
import { AppContext } from "../../Context/AppProvider";

const ChatHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(82, 38, 83, 0.1);
  .header {
    padding: 5px 10px;
    .header-title {
      margin-bottom: 5px;
    }
    .header-desc {
      font-size: 13px;
    }
  }
  .ant-btn {
    margin-right: 10px;
  }
  .user-box {
    display: flex;
    align-items: center;
    .ant-avatar {
      cursor: pointer;
    }
  }
`;

const ChatHeader = () => {
  const { selectedRoom, users, setIsVisibleInviteUser } = useContext(AppContext);
  const { name, description } = selectedRoom;

  function handleInviteUserModal() {
    setIsVisibleInviteUser(true);
  }

  return (
    <ChatHeaderStyled>
      <div className="header">
        <Typography.Title className="header-title" level={4}>
          {name}
        </Typography.Title>
        <Typography.Text className="header-desc">{description}</Typography.Text>
      </div>
      <div className="user-box">
        <Button shape="round" icon={<UserAddOutlined />} onClick={handleInviteUserModal}>
          Mời
        </Button>
        <Avatar.Group maxCount={3}>
          {users.map((user) => (
            <Tooltip key={user.uid} title={user.displayName} placement="bottom">
              <Avatar
                src={user.photoURL}
                style={{ backgroundColor: "#87d068" }}
              >
                {user.photoURL ? "" : user.displayName?.charAt(0).toUpperCase()}
              </Avatar>
            </Tooltip>
          ))}
        </Avatar.Group>
      </div>
    </ChatHeaderStyled>
  );
};

export default ChatHeader;
