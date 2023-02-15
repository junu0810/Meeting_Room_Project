import { baseData } from '../../confing';

function Sidebar({ setPage }) {

    return(
        <>
            <div>평가자 메뉴</div>
            <div onClick={() => setPage(baseData.eva)}>평가 인터뷰 목록</div>
            <div onClick={() => setPage(baseData.ques)}>질문지 관리</div>
        </>
    )
}

export default Sidebar;