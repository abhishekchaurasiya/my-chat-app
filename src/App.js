
import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import Join from "./components/join/Join"
import Chat from './components/chat/Chat';

function App() {
  return (
    <div className="App">
     
        <Routes>
          <Route path='/' element={<Join />} />
          <Route path='/chat' element={<Chat />} />
        </Routes>

    </div>
  );
}

export default App;
