// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BoardList from './components/BoardList';
import BoardDetail from './components/BoardDetail';
import BoardCreate from './components/BoardCreate';
import BoardEdit from './components/BoardEdit';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <Router>
      {/* <Header /> */}
      <div className="container">
        <Routes>
          <Route path="/" element={<BoardList />} />
          <Route path="/boards" element={<BoardList />} />
          <Route path="/boards/create" element={<BoardCreate />} />
          <Route path="/boards/:id" element={<BoardDetail />} />
          <Route path="/boards/:id/edit" element={<BoardEdit />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
