import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { saveUserInfo } from '../dummy/store';

function Login(props) {

  // store.js에 저장해 둔 임시 데이터 가져오기
  let userInfo = useSelector((state) => state.user);
  let dispath = useDispatch();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const setChange = (e, targetInfo) => {

    const { target: { value } } = e;
    console.log(value)
    targetInfo === "email" ? setUserEmail(value) : setUserName(value);

  }


  const checkSum = (event) => {

    event.preventDefault();
    let userInfo = {};
    console.log(userEmail.split("@").length);
    userEmail.split("@").length !== 2 ? alert("이메일을 확인해주세요.") : userInfo["email"] = userEmail;
    userName === "" ? alert("이름을 입력해주세요") : userInfo["name"] = userName;

    //TODO: Server와 통신하는 부분 작성

    checkUSer(userInfo)


  }

  // 삭제 예정
  const checkUSer = (user) => {
    userInfo.forEach(ele => {
      if (user.email === ele.email && user.name === ele.name) {
        dispath(saveUserInfo(ele));
        localStorage.setItem('userInfo', ele.name)
        props.navi(ele.role)
      }
    });
  }

  return (
    <div>
      <div> {/* LOGO 영역 */} </div>
      <div>
        <h5>코딩허브 서비스 이용을 위해 로그인 해주세요.</h5>
        <form onSubmit={checkSum}>
          <input placeholder='이름을 입력하세요' onChange={(e) => setChange(e, "name")}></input>
          <input placeholder='이메일을 입력하세요' onChange={(e) => setChange(e, "email")}></input>
          <button type="submit">로그인</button>
        </form>
      </div>
    </div>
  )

}

export default Login;