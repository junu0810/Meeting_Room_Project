import { useState } from 'react';
import axios from 'axios';
import { baseData } from '../../confing'


function Login({ setNavi , setRole , setClass }) {

  // store.js에 저장해 둔 임시 데이터 가져오기
  // let userInfo = useSelector((state) => state.user);
  // let dispath = useDispatch();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  
  
  const setChange = (e, targetInfo) => {

    const { target: { value } } = e;
    targetInfo === "email" ? setUserEmail(value) : setUserName(value);

  }

  const checkSum = (event) => {

    event.preventDefault();
    let userInfo = {};

    userEmail.split("@").length !== 2 ? alert("이메일을 확인해주세요.") : userInfo["email"] = userEmail;
    userName === "" ? alert("이름을 입력해주세요") : userInfo["name"] = userName;
    
    // axios.post(`${baseData.URL}/user/sigin`, { userInfo })
    // .then((el) =>{
    //  // 학생로그인
    //   if(el.data.role === 1){
    //     navi(baseData.stu)
    //     setClass(baseData.stuTest.class)
    //   }
    //   // 평가자 로그인
    //   else if(el.data.role === 2){
    //     navi(baseData.teach)
    //     setClass(baseData.stuTest.class)
    //   }
    // })
    // .catch(( e ) =>{
    //   console.log(e)
    // })
    
    //평가자용 테스트
    // setNavi(baseData.teach)
    // setClass(baseData.interTest.data)
    console.log(baseData.stuTest.data)
    //학생용 테스트
    setNavi(baseData.stu)
    setClass(baseData.stuTest.data)
    
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