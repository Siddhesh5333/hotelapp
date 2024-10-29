// import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Rooms from './Components/Rooms.jsx'
import Login from './Components/Login.jsx'
function App() {
  
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/rooms" element={<Rooms />} />
        </Routes>
      </Router>
    );
}

export default App;
