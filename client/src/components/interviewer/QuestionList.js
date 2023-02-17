

function QuestionList({ qusList }) {
    

    return (
        <div>
            {
                qusList.length === 0 
                ?
                <p>강의가 없습니다.</p>
                :
                qusList.map(el =>{
                    return(
                        <div key={el.uuid}>
                            <p>{el.progres}</p>
                            <p>{el.created_at}</p>
                            <h4>{el.class_name}</h4>
                            <button>강의 시작하기</button>
                            <a>휴지통</a>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default QuestionList;