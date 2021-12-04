import { useContext } from "react";
import ChatHeader from "./ChatHeader";
import ChatBox from "./ChatBox";
import styled from "styled-components";
import { AppContext } from "../../Context/AppProvider";
import { Alert } from "antd";

const ChatWindowsStyled = styled.div`
  height: 100vh;
  padding: 5px;
`;

const ChatWindows = () => {
  const { selectedRoom } = useContext(AppContext);
  return (
    <ChatWindowsStyled>
      {selectedRoom ? (
        <>
          <ChatHeader />
          <ChatBox />
        </>
      ) : (
        <Alert message="Hãy chọn phòng!!" type="info" closable showIcon></Alert>
      )}
    </ChatWindowsStyled>
  );
};

export default ChatWindows;
