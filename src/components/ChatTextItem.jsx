const ChatTextItem = ({text, type, time}) => {
  return(
    <div className={`chat-text-item ${type}`}>
      {text}
    </div>
  )
}

export default ChatTextItem;