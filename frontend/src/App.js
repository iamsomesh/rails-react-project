import './App.css';
import SignUp from './components/Auth/SignUp';
import Login from "./components/Auth/Login"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import ProtectedRoute from './components/Protected';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/signup" element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
