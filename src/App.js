import './App.scss';
import ChatWindow from './components/ChatWindow';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!(localStorage.getItem("token") && (localStorage.getItem("instance")))) {
      navigate('/');
    }
  }, []);

  return (
    <div className="App">
      <div className="chat-window">
        <ChatWindow></ChatWindow>
      </div>
    </div>
  );
}

export default App;