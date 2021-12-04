import { useContext, useMemo, useRef } from "react";
import { Button, Form, Input } from "antd";
import styled from "styled-components";
import Message from "./Message";
import { addDocs } from "../../firebase/service";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import useFirestore from "../../hooks/useFirestore";

const ChatRoomStyled = styled.div`
  height: calc(100% - 66px);
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  align-item: flex-end;
  padding: 0 10px 10px;
`;

const MessageListStyled = styled.div`
  overflow-y: auto;
  height: 100%;
  margin-bottom: 3px;
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
`;
const MessageInputStyled = styled.div`
  display: flex;
  .ant-input-affix-wrapper {
    padding: 3px 5px;
  }
`;

const ChatBox = () => {
  const [form] = Form.useForm();
  const { selectedRoomId } = useContext(AppContext);
  const { displayName, photoURL, uid } = useContext(AuthContext);
  const inputRef = useRef();

  function sendMessage() {
    const message = form.getFieldValue(["message"]);
    if (message) {
      form.resetFields();
      addDocs("message", {
        roomId: selectedRoomId,
        displayName,
        photoURL,
        uid,
        message,
      });
      inputRef.current.focus();
    }
  }

  const condition = useMemo(() => {
    return {
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoomId,
    };
  }, [selectedRoomId]);
  const messages = useFirestore("message", condition);
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  }
  function handleSendMessage() {
    sendMessage();
  }
  return (
    <ChatRoomStyled>
      <MessageListStyled>
        {messages.map((message) => (
          <Message
            styleRight={uid === message.uid ? true : false}
            key={message.id}
            message={message.message}
            photoURL={message.photoURL}
            displayName={message.displayName}
            createAt={message.createAt}
          ></Message>
        ))}
      </MessageListStyled>
      <MessageInputStyled>
        <Form form={form} style={{ width: "100%" }} onKeyDown={handleKeyDown}>
          <Form.Item name="message">
            <Input
              ref={inputRef}
              autoFocus="autofocus"
              autoComplete="off"
              placeholder="Nhập tin nhắn ..."
              suffix={
                <Button type="primary" onClick={handleSendMessage}>
                  Gửi
                </Button>
              }
            ></Input>
          </Form.Item>
        </Form>
      </MessageInputStyled>
    </ChatRoomStyled>
  );
};

export default ChatBox;
