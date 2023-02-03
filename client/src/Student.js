import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

function Student( {navi} ) {
    let who = useSelector((state) => state.loginUser)

    return (
        <div>
            {who.name === '' ? navi('/'): ''}
            <div> {/* LOGO 영역 */} </div>
            <div>
                <h4>{who.name}님, 반갑습니다.</h4>
                <h5>필요 시 자료 업르드 확인 후 인터뷰 장으로 입장해 주세요.</h5>
            </div>
            <div>
                <RoomList user={who.name}/>
            </div>
        </div>
    )
}

function RoomList( {user} ) {

    let roomList = useSelector((state => state.room))
    let roomInfo = roomList.filter(function(a) {
        return a.targetUser === user
    })
    let inputRef = useRef([])
    let [fileList, setFile] = useState(new Array(roomInfo.length));
    let [fileName, setFileName] = useState(new Array(roomInfo.length));

    return (
        <div>
            {
                roomInfo.length === 0
                ? <p>진행 중인 인터뷰가 없습니다.</p>
                : roomInfo.map(function(a,i) {
                    return (
                        <div key={i} style={{'border':'solid 1px #000'}}>
                            <p>{a.startTime}</p>
                            <h4>{a.roomName}</h4>
                            <button>공유파일 다운로드</button>
                            <input type="file" ref={(el) => (inputRef.current[i]= el)} onChange={ (e) => { UploadFile(e.target.files, i) } } style={{'display' : 'none'}} />
                            <p>{fileName[i]}<button onClick={()=>{ deleteFile(i) }}>삭제</button></p>
                            <button onClick={ () => { inputRef.current[i].click() } }>자료 업로드</button>
                            <button>시작하기</button>
                        </div>
                    )
                }) 
            }

        
        </div>
    )
    
    function UploadFile(el, index) {
        // 파일 저장
        let copyFile = [...fileList]
        copyFile[index] = el
        setFile(copyFile)
        // 파일 이름 저장
        let copyFileName = [...fileName]
        copyFileName[index] = el[0].name
        setFileName(copyFileName)
    }

    function deleteFile(index) {
        // 파일 저장
        let copyFile = [...fileList]
        copyFile[index] = null
        setFile(copyFile)
        // 파일 이름 저장
        let copyFileName = [...fileName]
        copyFileName[index] = ''
        setFileName(copyFileName)
    }

}



export default Student;