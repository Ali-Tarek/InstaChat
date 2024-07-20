import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif";
import { Container } from "../styles/Avatar.styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";

function SetAvatar() {
  const api = "https://api.dicebear.com/9.x/adventurer/svg?seed=";

  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (!localStorage.getItem("insta-chat-user")) {
      navigate("/login");
    }
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = JSON.parse(localStorage.getItem("insta-chat-user"));

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        Image: avatars[selectedAvatar],
      });
      console.log("data: ", data);
      if (data.status === true) {
        user.isAvatarSet = true;
        user.avatar = data.avatar;
        localStorage.setItem("insta-chat-user", JSON.stringify(user));
        toast.success("Avatar set successfully", toastOptions);
        setTimeout(() => {
          navigate("/");
        }, 4000);
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const data = [];
        for (let i = 0; i < 4; i++) {
          data.push(`${api}${Math.round(Math.random() * 50)}`);
        }
        setAvatars(data);
        setIsLoading(false);
      } catch (error) {
        toast.error("Failed to fetch avatars. Please try again.");
      }
    };

    fetchAvatars();
  }, []);

  return (
    <>
      <ToastContainer />
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Choose your Avatar</h1>
            <div className="avatars">
              {avatars.map((avatar, index) => {
                return (
                  <div
                    className={`avatar ${
                      selectedAvatar === index ? "selected" : ""
                    }`}
                    key={avatar}>
                    <img
                      src={avatar}
                      alt="Avatar"
                      onClick={() => setSelectedAvatar(index)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <button className="submit-btn" onClick={setProfilePicture}>
            Set As Profile Picture
          </button>
        </Container>
      )}
    </>
  );
}

export default SetAvatar;
