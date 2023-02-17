import React from 'react';
import { useState } from 'react';

function RoomList({ roomList }) {

    const [fileName , setFileName] = useState("");
    const fileInput = React.createRef();

    const handleButtonClick = (e) => {
        fileInput.current.click();
    };
      
    const handleChange = (e) => {
        // 업로드 후 파일명 출력
    };

    console.log(roomList)
    return (
        <div>
            {
                roomList.length === 0
                    ?
                    <p>강의가 없습니다.</p>
                    :
                    roomList.map(el => {
                        return (
                            <div key={el.uuid} style={{ 'border': 'solid 1px #000' }}>
                                <p>{el.created_at}</p>
                                <h4>{el.class_name}</h4>
                                {/* <input type="file" ref={(el) => (inputRef.current[i]= el)} onChange={ (e) => { UploadFile(e.target.files, i) } } style={{'display' : 'none'}} /> */}
                                {/* <p>{fileName[i]}<button onClick={()=>{ deleteFile(i) }}>삭제</button></p> */}
                                {/* <button onClick={ () => { inputRef.current[i].click() } }>자료 업로드</button> */}
                                <button>공유파일 다운로드</button>
                            {
                                el.progress === 0
                                ? 
                                <div>
                                {fileName?? <p>{fileName}</p>}
                                <button onClick={handleButtonClick}>파일 업로드</button>
                                <input type="file"
                                    ref={fileInput}
                                    onChange={handleChange}
                                    style={{ display: "none" }} />
                                <button>시작하기</button>
                                </div>
                                :
                                <p>이미 종료된 회의입니다.</p>
                            }

                            </div>
                        )
                    })
            }

        </div>
    )

}


export default RoomList;
