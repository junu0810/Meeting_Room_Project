import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Suspense } from 'react';
import Student from './components/Student';
import Login from './components/Login';

function App() {

  let navi = useNavigate();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login navi={navi} />} />
        <Route path="/stud" element={<Suspense><Student navi={navi} /></Suspense>} />
        <Route path="/teach" element={<div> 평가자 로그인 되었습니다.</div>} />
        <Route path="/admin" element={<div> 관리자 로그인 되었습니다.</div>} />
      </Routes>
    </div>
  );
}

export default App;
