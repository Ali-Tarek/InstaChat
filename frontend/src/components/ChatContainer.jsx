import React, { useState, useEffect, useRef } from "react";
import { MessageContainer } from "../styles/MessageContainer.styles";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import axios from "axios";
import { sendMessageRoute, allMessagesRoute } from "../utils/APIRoutes";
import { v4 as uuidv4 } from "uuid";

function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  useEffect(() => {
    const fetchData = async () => {
      if (currentChat) {
        const response = await axios.post(allMessagesRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });

        setMessages(response.data);
      }
    };
    fetchData();
  }, [currentChat, currentUser._id]);

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({
      fromSelf: true,
      message: msg,
    });

    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({
          fromSelf: false,
          message: msg,
        });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <MessageContainer>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img src={currentChat.avatar} alt="Avatar" />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}>
                <div className="content">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </MessageContainer>
  );
}

export default ChatContainer;
