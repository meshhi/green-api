import Modal from "./Modal";
import { useState, useEffect } from "react";

const CreateChat = ({disabled, callback}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return(
  <>
    <div 
      className="create-chat"
      disabled={!disabled}
      onClick={() => {
        setModalOpen(true)
      }}
      >
      Создать новый чат
    </div>
    <Modal isOpen={modalOpen} onClose={setModalOpen} callback={callback}></Modal>
  </>
  )
}

export default CreateChat