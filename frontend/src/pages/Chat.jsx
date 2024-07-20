import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Container } from "../styles/Chat.styles";
import { useNavigate } from "react-router-dom";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";

function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  useEffect(() => {
    async function fetchUserData() {
      if (!localStorage.getItem("insta-chat-user")) {
        navigate("/login");
      } else {
        setCurrentUser(
          await JSON.parse(localStorage.getItem("insta-chat-user"))
        );
        setIsLoaded(true);
      }
    }
    fetchUserData();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host, { transports: ["websocket"] });
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    async function fetchContacts() {
      if (currentUser !== null) {
        if (currentUser.isAvatarSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);

          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    }

    fetchContacts();
  }, [currentUser]);

  return (
    <Container>
      <div className="container">
        <Contacts
          contacts={contacts.users}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {isLoaded && currentChat !== null ? (
          <ChatContainer
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />
        ) : (
          <Welcome user={currentUser} />
        )}
      </div>
    </Container>
  );
}

export default Chat;
