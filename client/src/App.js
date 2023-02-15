import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Suspense, useState } from 'react';
import Student from './components/student/Student';
import Login from './components/common/Login';
import Interviewer from './components/interviewer/InterViewer';

function App() {

  let navi = useNavigate();
  const [ classData , setClass ] = useState();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login setNavi={navi} setClass={setClass}/>} />
        <Route path="/stud" element={<Suspense><Student classData={classData}/></Suspense>} />
        <Route path="/teach" element={<Interviewer classData={classData} />} />
        <Route path="/admin" element={<div> 관리자 로그인 되었습니다.</div>} />
      </Routes>
    </div>
  );
}

export default App;
