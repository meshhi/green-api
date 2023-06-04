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
    console.log('new chat added ' + contactId)
  };

  const getChatContent = (chatId, msgCount = 100) => {
    const fetchChatContent = async() => {
      try {
        const config = {
          url: `/waInstance${process.env.REACT_APP_GREEN_API_ID_INSTANCE}/getChatHistory/${process.env.REACT_APP_GREEN_API_TOKEN_INSTANCE}`,
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
    fetchChatContent()
      .then(data => {
        setChatContent(prev => {
          return [...data.data]
        })
        setChatContentIsSet(true);
      })
      .catch(err => {
        setChatContent(prev => {
          return [{
            type: 'error',
            textMessage: err.message
          }]
        })
        setChatContentIsSet(true);
      });
  };
  
  const sendMessageToChat = async() => {
    try {
      const config = {
        url: `/waInstance${process.env.REACT_APP_GREEN_API_ID_INSTANCE}/sendMessage/${process.env.REACT_APP_GREEN_API_TOKEN_INSTANCE}`,
        baseURL: process.env.REACT_APP_GREEN_API_URL,
        method: 'post',
        data: {
          chatId: currentChatId,
          message: messageRef.current.value,
        },
      }
      const data = await axios(config);
      getChatContent(currentChatId);
      return data;
    } catch (err) {
      setChatContent([{
        type: "error",
        textMessage: err.message
      }]);
      // return Promise.reject(err);
    }
  };


  useEffect(() => {
    const fetchChats = async() => {
      try {
        const config = {
          url: `/waInstance${process.env.REACT_APP_GREEN_API_ID_INSTANCE}/getChats/${process.env.REACT_APP_GREEN_API_TOKEN_INSTANCE}`,
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
                  return(
                    <ChatTextItem key={chat.textMessage} type={chat.type} text={chat.textMessage}></ChatTextItem>
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