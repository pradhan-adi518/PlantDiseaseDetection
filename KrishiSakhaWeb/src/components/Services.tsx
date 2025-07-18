import React, { useEffect, useState } from "react";
import LoginPage from "./ServiceLogin"; // Import your LoginPage component
import ChatScreen from "./ChatScreen";
import { io, Socket } from "socket.io-client";
import { UserProvider } from "../context/Username";

const Service: React.FC = () => {
  const [jwt, setJWT] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    if (jwt !== "") {
      const newsocket = io("http://localhost:3000", {
        auth: { token: jwt },
      });

      // Set up socket listeners
      newsocket.on("connect", () => {
        setIsConnected(true);
      });

      newsocket.on("disconnect", () => {
        setIsConnected(false);
      });

      setSocket(newsocket);

      // Cleanup the socket connection
      return () => {
        newsocket.disconnect();
      };
    }
  }, [jwt]);

  return (
    <UserProvider>
      {jwt === "" ? (
        <LoginPage setJwt={setJWT} />
      ) : isConnected && socket ? (
        <ChatScreen socket={socket} jwt={jwt} />
      ) : (
        null
      )}
    </UserProvider>
  );
};

export default Service;
