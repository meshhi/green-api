import { useState, useEffect } from "react";
import axios from "axios";
import ChatItem from "./ChatItem";
import CreateChat from "./CreateChat";
import Loader from "./Loader";

const ChatWindow = () => {
  const [chats, setChats] = useState([])
  const [chatsAreSet, setChatsAreSet] = useState(false);
  const [chatContent, setChatContent] = useState([]);
  const [chatContentIsSet, setChatContentIsSet] = useState(false);

  const createNewChat = (contactId) => {
    setChats((prev) => [{ id: `${contactId}@c.us`, name: contactId }, ...prev]);
    console.log('new chat added ' + contactId)
  };

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

    setChatsAreSet(false);
    fetchChats()
      .then((data) => {
        setChats((prev) => {
          return data.data.map((chatObj) => ({
            id: chatObj.id,
            name: chatObj.name
          }))
        });
        setChatsAreSet(true);
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
        <div className="chat-list">
          <CreateChat disabled={chatsAreSet} callback={createNewChat}></CreateChat>
          {chatsAreSet 
            ? chats.map((chat) => {
              return <ChatItem key={chat.id} id={chat.id} name={chat.name} setChatContent={setChatContent} setChatContentIsSet={setChatContentIsSet}></ChatItem>
            })
            : <Loader></Loader>
          }
        </div>
        <div className="chat-content">
          {chatContentIsSet
            ? chatContent.map((chat) => {
                return(
                  <div>
                    {chat.type} {chat.textMessage}
                  </div>
                )
              })
            : <Loader></Loader>
        }
        </div>
      </div>
    </>
  )
}

export default ChatWindow;