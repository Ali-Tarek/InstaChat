import React from "react";
import Robot from "../assets/robot.gif";
import Logout from "./Logout";
import { ChatContainer, LogoutWrapper } from "../styles/Welcome.styles";

function Welcome({ user }) {
  return (
    <ChatContainer>
      <LogoutWrapper>
        <Logout />
      </LogoutWrapper>
      <img src={Robot} alt="Robot" />
      <h1>
        Welcome, <span>{user?.username}</span>
      </h1>
      <h3>Please select a chat to start messaging</h3>
    </ChatContainer>
  );
}

export default Welcome;
