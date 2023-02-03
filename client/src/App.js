import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useState, lazy, Suspense } from 'react';
import { saveUserInfo } from './store';
const Student = lazy(() => import('./Student'));

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

// Login Component
function Login(props) {

  // store.js에 저장해 둔 임시 데이터 가져오기
  let userInfo = useSelector((state) => state.user);

  // let loginInfo = useSelector((state) => state.user);
  let dispath = useDispatch();

  // 입력받은 사용자 이름과 이메일을 저장할 state
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');

  // 이메일 형식 체크를 위해 상태값을 저장할 state
  let [check, setCheck] = useState(false);

  // 로그인 밸리데이션 체크 함수
  function checkUser(userName, userEmail) {
    if (userName === '') { // 이름을 입력하지 않았을 때
      alert("이름을 입력해 주세요.")
      return false;
    } else if (userEmail === '') {  // 이메일을 입력하지 않았을 때
      alert("이메일을 입력해 주세요.")
      return false;
    } else if (!userEmail.includes('@')) {  // 이메일 형식이 올바르지 않을 때
      setCheck(true)
      return false;
    } else {
      return true;

    }
  }

  return (
    <div>
      <div> {/* LOGO 영역 */} </div>
      <div>
        <h5>코딩허브 서비스 이용을 위해 로그인 해주세요.</h5>
        <h5>이름</h5>
        <input placeholder="이름을 입력해 주세요." onChange={(e) => { setName(e.target.value) }}></input>
        <h5>이메일</h5>
        <input placeholder="이메일을 입력해 주세요." onChange={(e) => { setEmail(e.target.value); setCheck(false); }}></input>
        {check ? <span style={{ 'color': 'red' }}>이메일 형식이 올바르지 않습니다.</span> : ''}
        <button onClick={() => {
          if (checkUser(name, email)) { // 로그인 밸리데이션 체크 결과가 true일 경우
            // 존재하는 user인지 확인
            let user = userInfo.find(function (a) {
              return a.name === name && a.email === email
            })

            if (user === undefined) { // 이름 또는 이메일이 틀렸거나, 존재하지 않는 user일 경우
              alert('이름 또는 이메일을 확인해 주세요.')
            } else {
              dispath(saveUserInfo(user));
              localStorage.setItem('userInfo', user.name)
              props.navi(user.role)
            }
          }
        }}>Login</button>
      </div>
    </div>
  )


}

export default App;
