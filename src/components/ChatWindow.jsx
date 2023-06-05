import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ChatItem from "./ChatItem";
import ChatTextItem from "./ChatTextItem";
import CreateChat from "./CreateChat";
import Loader from "./Loader";

const ChatWindow = () => {
  const [chats, setChats] = useState([])
  const [chatsAreSet, setChatsAreSet] = useState(false);
  const [chatContent, setChatContent] = useState([]);
  const [chatContentIsSet, setChatContentIsSet] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(null);

  const messageRef = useRef();

  const createNewChat = (contactId) => {
    setChats((prev) => [{ id: `${contactId}@c.us`, name: contactId }, ...prev]);
  };

  const getChatContent = async (chatId, msgCount = 100) => {
    const fetchChatContent = async() => {
      try {
        const config = {
          url: `/waInstance${localStorage.getItem("instance")}/getChatHistory/${localStorage.getItem("token")}`,
          baseURL: process.env.REACT_APP_GREEN_API_URL,
          method: 'post',
          data: {
            chatId,
            msgCount
          },
        };
        setCurrentChatId(chatId);
        const data = await axios(config);
        return data;
      } catch (err) {
        return Promise.reject(err);
      }
    };
    setChatContentIsSet(false);
    let data;
    try {
      data = await fetchChatContent();
      setChatContent(prev => {
        return [...data.data]
      })
    } catch(err) {
      setChatContent(prev => {
        return [{
          type: 'error',
          textMessage: err.message
        }]
      })
    } finally {
      setChatContentIsSet(true);
    }
  };
  
  const sendMessageToChat = async() => {
    try {
      const config = {
        url: `/waInstance${localStorage.getItem("instance")}/sendMessage/${localStorage.getItem("token")}`,
        baseURL: process.env.REACT_APP_GREEN_API_URL,
        method: 'post',
        data: {
          chatId: currentChatId,
          message: messageRef.current.value,
        },
      }
      const data = await axios(config);
      console.log('message sent')
      console.log(data.data);
      await getChatContent(currentChatId);
      console.log('chat content received')
      console.log(chatContent);
      return data;
    } catch (err) {
      setChatContent([{
        type: "error",
        textMessage: err.message
      }]);
    }
  };


  useEffect(() => {
    const fetchChats = async() => {
      try {
        const config = {
          url: `/waInstance${localStorage.getItem("instance")}/getChats/${localStorage.getItem("token")}`,
          baseURL: process.env.REACT_APP_GREEN_API_URL,
          method: 'get',
        }
        const data = await axios(config);
        console.log(data);
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
            name: chatObj.name ? chatObj.name : chatObj.id
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
      <div className="inner-chat-window">
        <div className="left-bar">
          <CreateChat disabled={chatsAreSet} callback={createNewChat}></CreateChat>
          <div className="chat-list">
            {chatsAreSet 
              ? chats.map((chat) => {
                return <ChatItem key={chat.id} id={chat.id} name={chat.name} getChatContent={getChatContent}></ChatItem>
              })
              : <Loader></Loader>
            }
          </div>
        </div>
        <div className="right-bar">
          <div className="chat-content">
            {chatContentIsSet
              ? chatContent.map((chat) => {
                console.log(chatContent)
                  return(
                    <ChatTextItem key={chat.textMessage} type={chat.type} text={chat.textMessage} time={chat.timestamp}></ChatTextItem>
                  )
                })
              : <Loader></Loader>
            }
          </div>
          <div className="input_message">
            <input className="input_message__field" type="text" name="" id="" placeholder="Текст сообщения..." ref={messageRef}></input>
            <button className="input_message__button" onClick={sendMessageToChat}>Отправить</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatWindow;