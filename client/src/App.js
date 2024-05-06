import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
// Error Page
import Error from "./components/Error";
// Member entry page
import AddMember from "./components/AddMember";
// Members Page
import MemberList from "./components/MemberList";
// Main page
import Landing from "./components/Landing";

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route path="/add-member" element={<AddMember />} />
            <Route path="/member-list" element={<MemberList />} />
            <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;