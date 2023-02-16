

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


    return(
        <div>
            <p>전체</p>
            <p>진행 예정</p>
            <p>진 행 중</p>
            <p>진행 완료</p>
            {
                dataList.length === 0 
                ?
                <p>강의가 없습니다.</p>
                :
                dataList.map(el =>{
                    return(
                        <div key={el.uuid}>
                            <p>{el.progres}</p>
                            <p>{el.created_at}</p>
                            <h4>{el.class_name}</h4>
                            <button>강의 시작하기</button>
                            {/* TODO :해당함수로 삭제 API 보내기 */}
                            <button>평가 파일 다운로드</button>
                            <p onClick={() => {deleteTarget()}}>휴지통</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default EvaList;