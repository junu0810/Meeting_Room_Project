import '../../style.css/interviewer/dataList/EvaList.css';

function EvaList({ evaList }) {

    let dataList = [];
    evaList.forEach(el =>{
        if(el.progress === 0){
            el.progres = "진행예정"
            dataList.push(el)
        }
        else if(el.progress === 1){
            el.progres = "진행중"
            dataList.push(el)
        }
        else if(el.progress === 2){
            el.progres = "진행완료"
            dataList.push(el)
        }
    }) 

const deleteTarget = (uuid)=>{
    console.log(uuid)
}


    return (
    <div className="page-content__interview-list">
        <div className="filter-button">
            <button>전체</button>
            <button>진행 예정</button>
            <button>진행 중</button>
            <button>진행 완료</button>
        </div>

        <ul className="interview-list-area">
            {
                dataList.length === 0 
                ?
                <div className="no-session-list"><p>강의가 없습니다.</p></div>
                :
                dataList.map(el =>{
                    return (
                        // before-session-list구간 -> 추후에 ongoin, after 구간도 추가해야함
                       <div className="before-session-list-form">
                            <div className="session-list-left" key={el.uuid}>
                                <span className="status-text">{el.progres}</span>
                                <p className="start-time">{el.created_at}</p>
                                <h4 className="room-name">{el.class_name}</h4>
                            </div>

                            <div className="session-list-right">
                                <div className="right-top">
                                    <button className="delete-button" onClick={() => { deleteTarget() }}></button>
                                </div>
                                <div className="right-bottom">
                                    <button className="start-button">강의 시작하기</button>
                                    {/* TODO :해당함수로 삭제 API 보내기 */}
                                        <button className="before-download-button">평가 파일 다운로드</button>
                                </div>    
                                
                            </div>
                        </div>      
                    )
                })
            }
        </ul>
    </div>
    )
}

export default EvaList;