import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="Parent-Container">
        <NavBar/>

        <Route path="/" exact component={}/>
        <Route path="/about/" component={}/>
        <Route path="/users/" component={}/>
      </div>
    </Router>
  );
}

export default App;
