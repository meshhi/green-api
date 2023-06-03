import './App.css';
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
      <header className="App-header">
      </header>
      <section>
        <ChatWindow></ChatWindow>
      </section>
    </div>
  );
}

export default App;