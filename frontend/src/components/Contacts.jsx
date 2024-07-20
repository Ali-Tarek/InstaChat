import React, { useEffect, useState } from "react";
import { ContactsContainer } from "../styles/Contacts.styles";
import Logo from "../assets/logo.svg";

function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUsername, setCurrentUsername] = useState(null);
  const [currentUserAvatar, setCurrentUserAvatar] = useState(null);
  const [currentSelected, setCurrentSelected] = useState(null);

  useEffect(() => {
    if (currentUser !== null) {
      setCurrentUsername(currentUser.username);
      setCurrentUserAvatar(currentUser.avatar);
    }
  }, [currentUser]);

  const changeCurrectChat = (index, contact) => {
    setCurrentSelected(index)
    changeChat(contact)
  };

  
  return (
    <>
      {currentUsername && currentUserAvatar ? (
        <ContactsContainer>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>InstaChat</h1>
          </div>

          <div className="contacts">
            {Array.isArray(contacts) &&
              contacts.map((contact, index) => {
                return (
                  <div
                    className={`contact ${
                      index === currentSelected ? "selected" : ""
                    }`}
                    key={index}
                    onClick={() => changeCurrectChat(index, contact)}>
                    <div className="avatar">
                      <img src={contact.avatar} alt="Avatar" />
                    </div>
                    <div className="username">
                      <h3>{contact.username}</h3>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="current-user">
            <div className="avatar">
              <img src={currentUser.avatar} alt="Avatar" />
            </div>
            <div className="username">
              <h2>{currentUser.username}</h2>
            </div>
          </div>
        </ContactsContainer>
      ) : null}
    </>
  );
}

export default Contacts;
