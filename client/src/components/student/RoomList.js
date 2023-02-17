import React from 'react';
import { useState } from 'react';
import '../style.css/student/RoomList.css';


function RoomList({ roomList }) {

    const [fileName , setFileName] = useState("");
    const fileInput = React.createRef();

    const handleButtonClick = (e) => {
        fileInput.current.click();
    };
      
    const handleChange = (e) => {
        // 업로드 후 파일명 출력
    };

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
                                        <button className='download-button'>공유 파일 다운로드</button>
                                    </div>

                                    {/* <input type="file" ref={(el) => (inputRef.current[i]= el)} onChange={ (e) => { UploadFile(e.target.files, i) } } style={{'display' : 'none'}} /> */}
                                    {/* <p>{fileName[i]}<button onClick={()=>{ deleteFile(i) }}>삭제</button></p> */}
                                    {/* <button onClick={ () => { inputRef.current[i].click() } }>자료 업로드</button> */}

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
                                </div>
                            </div>
                        )
                    })
            }

        </div>
    )

}


export default RoomList;
