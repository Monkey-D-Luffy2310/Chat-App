import React from "react";
import { Avatar, Typography } from "antd";
import styled from "styled-components";
import { formatRelative } from "date-fns";

const { Text } = Typography;

const MessageStyled = styled.div`
  display: flex;
  margin-bottom: 10px;
  width: 400px;
  justify-content: start;
  .ant-avatar {
    margin-right: 8px;
    flex-shrink: 0;
  }
  .message-user {
    font-weight: bold;
    margin-right: 5px;
    font-size: 15px;
  }
  &.styleRight {
    margin-left: auto;
  }
  .message-text {
    overflow-wrap: anywhere;
  }
`;

const TextStyled = styled(Text)`
  font-size: 10px;
`;

const Message = ({ message, photoURL, displayName, createAt, styleRight }) => {
  function formatDate(seconds) {
    if (seconds) {
      const formattedDate = formatRelative(
        new Date(seconds * 1000),
        new Date()
      );
      return formattedDate.charAt(0).toUpperCase() + formattedDate.slice("1");
    } else return;
  }

  return (
    <MessageStyled className={styleRight ? "styleRight" : ""}>
      <Avatar size={30} src={photoURL}>
        {photoURL ? "" : displayName?.charAt(0).toUpperCase()}
      </Avatar>
      <div className="message-box">
        <div className="message-info">
          <span className="message-user">{displayName}</span>
          <TextStyled type="secondary">
            {formatDate(createAt?.seconds)}
          </TextStyled>
        </div>
        <span className="message-text">{message}</span>
      </div>
    </MessageStyled>
  );
};

export default Message;
