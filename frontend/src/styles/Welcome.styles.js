import styled from "styled-components";

export const ChatContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;

export const LogoutWrapper = styled.div`
  position: absolute;
  padding: 11px 32px;
  top: 0;
  right: 0;
`;