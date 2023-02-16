import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import Student from './components/student/Student';
import Login from './components/common/Login';
import Interviewer from './components/interviewer/InterViewer';
import './App.css';

function App() {

  let navi = useNavigate();
  const [ classData , setClass ] = useState();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login setNavi={navi} />} />
        <Route path="/stud" element={< Student />} />
        <Route path="/teach/*" element={< Interviewer />} />
        <Route path="/admin" element={<div> 관리자 로그인 되었습니다.</div>} />
      </Routes>
    </div>
  );
}

export default App;
