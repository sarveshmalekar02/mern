import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './component/register';
import Login from './component/login';
import Posts from './component/post/posts'



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts" element ={<Posts/>} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
