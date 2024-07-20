import styled from "styled-components";

export const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #131324;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 5rem;
    }

    h1 {
      color: white;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem; /* Reduced gap between inputs */
    background-color: rgba(0, 0, 0, 0.47);
    border-radius: 2rem;
    padding: 3rem 5rem;
    width: 100%;
    max-width: 500px; /* Made the card wider */
  }

  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;

    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }

  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;

    &:hover {
      background-color: #3b07e6;
    }
  }

  span {
    color: white;
    font-size: 20px;

    a {
      color: #4e0eff;
      font-weight: bold;
    }
  }

  @media (max-width: 768px) {
    form {
      padding: 2rem 3rem;
    }

    .brand img {
      height: 4rem;
    }
  }

  @media (max-width: 480px) {
    form {
      padding: 1.5rem 2rem;
    }

    .brand img {
      height: 3rem;
    }
  }
`;
