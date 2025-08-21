import Topbar from "./components/topbar/Topbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write.jsx";
import Setting from "./pages/settings/Setting";
import { useContext } from "react";
import { Context } from "./context/Context";
import Search from "./components/search/Search";
import "./App.css"
import About from "./pages/about/About.jsx";
import Contact from "./pages/contact/Contact.jsx";
function App() {
  const user = useContext(Context)
  return (
    <div className="w-full min-h-full overflow-y-auto">
    <Router>
    <Topbar/>
    <Routes>
    <Route path="/" element={<Homepage/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/posts" element={<Homepage/>}/>
    <Route path="/register" element={user.user !== null ?<Homepage/>:<Register/>}/>
    <Route path="/login" element={user.user !== null?<Homepage/>:<Login/>}/>
    <Route path="/post/:id" element={<Single/>}/>
    <Route path="/write" element={user.user !== null?<Write/>:<Register/>}/>
    <Route path="/" element={user.user !== null?<Search/>:<Register/>}/>
    <Route path="/settings" element={user.user !== null?<Setting/>:<Register/>}/>
    </Routes>
    </Router>
    </div>
  );
}

export default App;
