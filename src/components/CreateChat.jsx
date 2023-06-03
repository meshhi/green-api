import Modal from "./Modal";
import { useState, useEffect } from "react";

const CreateChat = ({disabled}) => {
  const [modalOpen, setModalOpen] = useState(false)

  return(
  <>
    <div 
      className="create-chat"
      disabled={!disabled}
      onClick={() => {
        console.log("Creating chat");
        setModalOpen(true)
      }}
      >
      CREATE
    </div>
    <Modal isOpen={modalOpen} onClose={setModalOpen}></Modal>
  </>
  )
}

export default CreateChat