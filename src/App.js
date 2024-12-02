// import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { BookingProvider } from './Components/BookingContext.jsx';
import Rooms from './Components/Rooms.jsx'
import Login from './Components/Login.jsx'
import RoomReport from './Components/RoomReport.jsx';

function App() {
  
    return (
      <BookingProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/RoomReport" element={<RoomReport/>} /> 
        </Routes>
      </Router>
      </BookingProvider>
    );
}

export default App;
