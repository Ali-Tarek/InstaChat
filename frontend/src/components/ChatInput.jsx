import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import styled from "styled-components";

function ChatInput({ handleSendMsg }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiClick = (emoji) => {
    setMsg(msg + emoji.emoji);
  };

  const sendMsg = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
      setShowEmojiPicker(false);
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
          {showEmojiPicker && (
            <div className="emoji-picker">
              <Picker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
      </div>

      <form className="input-container" onSubmit={(e) => sendMsg(e)}>
        <input
          type="text"
          placeholder="Type a message..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type="submit" className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background-color: #080420;
  // border-top: 1px solid #080420;

  .button-container {
    display: flex;
    align-items: center;
    margin-right: 1rem;

    .emoji {
      position: relative;
      display: flex;
      align-items: center;

      svg {
        font-size: 1.5rem;
        cursor: pointer;
        color: #ffee00;
      }

      .emoji-picker {
        position: absolute;
        bottom: 50px;
        left: 0;
        background-color: #fff;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
        border-radius: 0.5rem;
        overflow: hidden;
        z-index: 1000;
        .emoji-scroll-wrapper {
          padding: 0.5rem;
        }
        .emoji-categories {
          button {
            filter: grayscale(100%);
          }
        }
        .emoji-search {
          margin-bottom: 0.5rem;
        }
      }
    }
  }

  .input-container {
    display: flex;
    align-items: center;
    flex-grow: 1;
    background-color: #fff;
    border-radius: 1.5rem;
    padding: 0.5rem 1rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

    input {
      border: none;
      flex-grow: 1;
      padding: 0.5rem;
      outline: none;
      border-radius: 1.5rem;
      font-size: 1rem;
    }

    .submit {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #007bff;
      border: none;
      border-radius: 50%;
      padding: 0.5rem;
      margin-left: 0.5rem;
      cursor: pointer;
      color: #fff;
      font-size: 1.5rem;
      transition: background-color 0.3s;

      &:hover {
        background-color: #0056b3;
      }
    }
  }
`;

export default ChatInput;
