import { useState, useEffect } from "react";
import axios from "axios";
import ChatItem from "./ChatItem";
import CreateChat from "./CreateChat";

const ChatWindow = () => {
  const [chats, setChats] = useState([])
  const [chatContent, setChatContent] = useState([]);
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const fetchChats = async() => {
      try {
        const config = {
          url: `/waInstance${process.env.REACT_APP_GREEN_API_ID_INSTANCE}/getContacts/${process.env.REACT_APP_GREEN_API_TOKEN_INSTANCE}`,
          baseURL: process.env.REACT_APP_GREEN_API_URL,
          method: 'get',
        }
        const data = await axios(config);
        return data;
      } catch (err) {
        return Promise.reject(err);
      }
    }

    fetchChats()
      .then((data) => {
        setChats((prev) => {
          return data.data.map((chatObj) => ({
            id: chatObj.id,
            name: chatObj.name
          }))
        });
      })
      .catch((err) => {
        setChats((prev) => {
          return [err.message]
        });
      });
  }, []);

  return(
    <>
      <div className="chat-window">
        <CreateChat></CreateChat>
        <div className="chat-list">
        {chats.map((chat) => {
            return <ChatItem key={chat.id} id={chat.id} name={chat.name} setChatContent={setChatContent}></ChatItem>
          })}
        </div>
        <div className="chat-content">
          {chatContent.map((chat) => {
            return(
              <div>
                {chat.type} {chat.textMessage}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default ChatWindow;