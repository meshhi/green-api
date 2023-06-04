const ChatTextItem = ({text, type}) => {
  return(
    <div className={`chat-text-item ${type}`}>{text}</div>
  )
}

export default ChatTextItem;