import { baseData } from '../../confing';
import '../style.css/interviewer/Sidebar.css';

function Sidebar({ setPage }) {

    return(
        <div className='page-content__side-menu'>
            <h4 className="side-menu-heading">평가자 메뉴</h4>
            <li className="interview-list"><button onClick={() => setPage(baseData.eva)}>평가 인터뷰 목록</button></li>
            <li className="question-list"><button onClick={() => setPage(baseData.ques)}>질문지 관리</button></li>
        </div>
    )
}

export default Sidebar;