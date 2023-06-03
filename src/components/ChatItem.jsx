import axios from "axios";

const ChatItem = ({id, name, setChatContent}) => {
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
        return data;
      } catch (err) {
        return Promise.reject(err);
      }
    }

    fetchChatContent()
      .then(data => {
        setChatContent(prev => {
          return [...data.data]
        })
      })
      .catch(err => {
        setChatContent(prev => {
          return []
        })
      });
  };

  return(
    <div className="chat-item" data-id={id} onClick={(event) => {
      getChatContent(event.target.dataset.id)
    }}>{name}</div>
  )
}

export default ChatItem;