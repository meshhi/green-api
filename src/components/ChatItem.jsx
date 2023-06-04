const ChatItem = ({id, name, getChatContent}) => {
  
  return(
    <div className="chat-item" data-id={id} onClick={(event) => {
      getChatContent(event.target.dataset.id);
    }}>{name}</div>
  )
}

export default ChatItem;