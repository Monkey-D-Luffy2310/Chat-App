import { useContext } from "react";
import { Avatar, Button, Typography } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { auth } from "../../firebase/config";
import { AuthContext } from "../../Context/AuthProvider";

const UserInfoStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid rgba(82, 38, 83);
  .username {
    margin-left: 5px;
    color: white;
  }
`;
const UserInfo = () => {
  const { displayName, photoURL } = useContext(AuthContext);

  function handleLogout() {
    auth.signOut();
  }

  return (
    <UserInfoStyled>
      <div>
        <Avatar
          className="avatar"
          src={photoURL}
          style={{ backgroundColor: "#f56a00" }}
        >
          {photoURL ? "" : displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography.Text className="username">{displayName}</Typography.Text>
      </div>
      <Button ghost icon={<LogoutOutlined />} onClick={handleLogout}>
        Đăng xuất
      </Button>
    </UserInfoStyled>
  );
};

export default UserInfo;
