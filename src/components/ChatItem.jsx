import axios from "axios";

const ChatItem = ({id, name, setChatContent, setChatContentIsSet, setCurrentChatId}) => {
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
        }
        const data = await axios(config);
        setCurrentChatId(chatId);
        return data;
      } catch (err) {
        return Promise.reject(err);
      }
    }

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
          return [`${err}`]
        })
        setChatContentIsSet(true);
      });
  };

  return(
    <div className="chat-item" data-id={id} onClick={(event) => {
      getChatContent(event.target.dataset.id);
    }}>{name}</div>
  )
}

export default ChatItem;