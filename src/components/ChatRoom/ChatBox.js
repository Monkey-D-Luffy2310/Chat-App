import { useContext, useMemo, useRef, useEffect } from "react";
import { Button, Form, Input, Tooltip } from "antd";
import styled from "styled-components";
import Message from "./Message";
import { addDocs } from "../../firebase/service";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import useFirestore from "../../hooks/useFirestore";
import { Picker } from "emoji-mart";

const ChatRoomStyled = styled.div`
  height: calc(100% - 66px);
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  align-item: flex-end;
  padding: 0 10px 10px;
`;

const MessageBoxStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: calc(100% - 66px);
`;

const MessageListStyled = styled.div`
  overflow-y: auto;
  max-height: 100%;
  margin-bottom: 3px;
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
  const messageListRef = useRef();

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
  function handleClick(e) {
    const message = form.getFieldValue(["message"]) ?? "";
    form.setFieldsValue({ message: message + e.native });
  }

  useEffect(() => {
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight + 50;
  }, [messages]);

  return (
    <ChatRoomStyled>
      <MessageBoxStyled>
        <MessageListStyled ref={messageListRef}>
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
      </MessageBoxStyled>
      <MessageInputStyled>
        <Form form={form} style={{ width: "100%" }} onKeyDown={handleKeyDown}>
          <Form.Item name="message">
            <Input
              ref={inputRef}
              autoFocus="autofocus"
              autoComplete="off"
              placeholder="Nhập tin nhắn ..."
              prefix={
                <Tooltip
                  trigger="click"
                  title={
                    <Picker
                      set="apple"
                      showPreview={false}
                      showSkinTones={false}
                      onClick={handleClick}
                    />
                  }
                >
                  <span style={{ marginRight: "5px", cursor: "context-menu" }}>
                    😃
                  </span>
                </Tooltip>
              }
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
