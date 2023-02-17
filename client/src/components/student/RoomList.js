import React from 'react';
import { useState } from 'react';
import '../style.css/student/RoomList.css';


function RoomList({ roomList }) {

    const [fileName, setFileName] = useState("");
    const fileInput = React.createRef();

    const handleButtonClick = (e) => {
        fileInput.current.click();
    };

    const handleChange = (e) => {
        // 업로드 후 파일명 출력
    };

    console.log(roomList)
    return (
        <div className='page-content__list'>
            {
                roomList.length === 0
                    ?
                    <div className='no-session-list'><p>강의가 없습니다.</p></div>
                    :
                    roomList.map(el => {
                        return (
                            <div className='content-session-list'>
                                <div className='start-session-list-form' key={el.uuid}>
                                    <div className='session-list-left'>
                                        <p className='start-time'>{el.created_at}</p>
                                        <h4 className='room-name'>{el.class_name}</h4>

                                        <button>공유파일 다운로드</button>
                                    </div>
                                    {
                                        el.progress === 0
                                            ?
                                            <div className='session-list-right'>
                                                {/* 파일 업로드 결과 예시 */}
                                                <div className='file-preview'>
                                                    <p>파일 업로드 결과 예시</p>
                                                    <button></button>
                                                </div>
                                                {fileName ?? <p>{fileName}</p>}
                                                <input id='upload-input' type="file" multiple="multiple" accept='.ppt, .pptx, .pdf, .zip'
                                                    ref={fileInput}
                                                    onChange={handleChange}
                                                    style={{ display: "none" }} />
                                                <label className='upload-button' for="upload-input" onClick={handleButtonClick}>자료업로드</label>
                                                <button className='start-button'>시작하기</button>
                                            </div>
                                            :
                                            <p>이미 종료된 회의입니다.</p>
                                    }
                                </div>
                            </div>
                        )
                    })
            }
        </div>
    )

}


export default RoomList;
