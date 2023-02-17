

function QuestionList({ queList }) {
    
    return (
        <div>
            {
                queList.length === 0 
                ?
                <p>질문지가 없습니다.</p>
                :
                queList.map(el =>{
                    return(
                        <div key={el.uuid}>
                            <p>{el.progres}</p>
                            <p>{el.created_at}</p>
                            <h4>{el.class_name}</h4>
                            <button>수정하기</button>
                            <p>휴지통</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default QuestionList;