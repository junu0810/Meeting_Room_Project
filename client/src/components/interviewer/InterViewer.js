import Sidebar from './Sidebar';
import EvaList from './dataList/EvaList'
import QuestionList from './dataList/QuestionList'
import { useEffect, useRef, useState } from 'react';
import { baseData } from '../../confing';
import axios from 'axios';
import Modal from 'react-modal';
import Calendar from 'react-calendar';
import ModlaDropDown from './modal/ModalDropDown';
import PageNav from '../common/PageNav';




function Interviewer() {

    const [ nowPage, setPage] = useState(baseData.eva);
    const [ loading, isLoading] = useState(false);
    const [ userData, setData] = useState();

    const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const [ modalData, setModalData ] = useState({});
    const [ qusData , setqusData ] = useState([[1,'']]);
    const [ showStart, setShowStart ] = useState(false);
    const [ viewStart, setViewStart ] = useState("");
    const [ showEnd, setShowEnd ] = useState(false);
    const [ viewEnd, setViewEnd ] = useState("");
    const [ StartDate, setStartDate ] = useState();
    const [ EndDate, setEndDate ] = useState();
    const [ viewDrop, setViewDrop] = useState(false);

    const [ nowPageNum , setNowPage ] = useState(1);

    useEffect(() => {
        async function getData() {
            await axios.get(`${baseData.URL}/user/interinfo?page=${nowPageNum}`, {
                headers: {
                    Authorization: "example-token"
                }
            })
                .then(el => {
                    const { data: { result } } = el
                    isLoading(true)
                    setData(result)
                })
                .catch((e => {
                    console.log(e)
                }))
        }
        getData()
    }, [nowPage , nowPageNum])

    useEffect(() => {

    }, [StartDate, EndDate])

    const postData = ( e , thisPage) => {
        e.preventDefault();
        setModalData({queList: qusData})
        console.log(modalData)
        console.log(nowPage)
        // axios로 데이터 보내고 정상처리시 setModalIsOpen(!modalIsOpen) 하기
    }
    
    const InputModal = (e, modalName, targetele) => {
        const { target: { value } } = e;
        setModalData({ ...modalData, targetModal: modalName })
        if (modalName === baseData.eva) {
            if (targetele === baseData.evaName) {
                setModalData({ ...modalData, evaName: value })
            }
            else if (targetele === baseData.evaTarget) {
                setModalData({ ...modalData, evaTarget: value })
            }

        }
        else if (modalName === baseData.ques) {
            if (targetele === baseData.quesTitle) {
                setModalData({ ...modalData, quesTitle: value })
            }
        }
    }

    const changeQuesEle = (ind) => (e) =>{
        const {target : {value}} = e;
        qusData[ind][1] = value;
        console.log(qusData)
    }

    const setChangeDate = (e, type) => {
        if (type === baseData.evaStart) {
            const startDate = toStringByFormatting(e, '-')
            setStartDate(e)
            setModalData({ ...modalData, StartDate: startDate })
            setViewStart(startDate)
            setShowStart(!showStart)
        }
        else {
            const endDate = toStringByFormatting(e, '-')
            setModalData({ ...modalData, EndtDate: endDate })
            setViewEnd(endDate)
            setEndDate(e)
            setShowEnd(!showEnd)
        }
    }  

    function leftPad(value) {
        if (value >= 10) {
            return value;
        }

        return `0${value}`;
    }

    const toStringByFormatting = (source, delimiter = '-') => {
        const year = source.getFullYear();
        const month = leftPad(source.getMonth() + 1);
        const day = leftPad(source.getDate());

        return [year, month, day].join(delimiter);
    }

    return (
        <div>
            {
                loading
                    ?
                    <div>
                        <p>평가자 인터뷰 목록</p>
                        <p onClick={() => setModalIsOpen(true)}> + </p>
                        {
                            nowPage === baseData.eva
                                ?
                                <Modal isOpen={modalIsOpen} appElement={document.getElementById('root')}>
                                    <h4>인터뷰 신규등록</h4>
                                    <form onSubmit={postData}>
                                        <p onClick={() => setModalIsOpen(false)}>X</p>
                                        {/* TODO : 나중에 br태그 다 지워야함 */}
                                        <div>
                                            <p>인터뷰명</p>
                                            <input onChange={(e) => InputModal(e, baseData.eva, baseData.evaName)}>
                                            </input>
                                        </div>
                                        <div>
                                            <p>인터뷰 대상자</p>
                                            <input onChange={(e) => InputModal(e, baseData.eva, baseData.evaTarget)} />
                                        </div>
                                        <div>
                                            <p onClick={() => setShowStart(!showStart)}>인터뷰 시작 시간</p>
                                            <p onClick={() => setShowStart(!showStart)}>{viewStart}</p>
                                            {showStart ? <Calendar onChange={(e) => setChangeDate(e, baseData.evaStart)} /> : <></>}
                                        </div>
                                        <div><p onClick={() => setShowEnd(!showEnd)}>인터뷰 종료 시간</p>
                                            <p onClick={() => setShowEnd(!showEnd)}>{viewEnd}</p>
                                            {showEnd ?
                                                <Calendar onChange={(e) => setChangeDate(e, baseData.evaEnd)} /> : <></>}
                                        </div>
                                        <div >인터뷰 질문지</div>
                                        {viewDrop ?
                                            <p onClick={() => setViewDrop(!viewDrop)}>^</p> : <p onClick={() => setViewDrop(!viewDrop)}>⌄</p>}
                                        {viewDrop &&
                                            <ModlaDropDown modalData={modalData} setModalData={setModalData} queList={userData.queList} />
                                        }
                                        <button type="submit">저장하기</button>
                                    </form>
                                </Modal>
                                :
                                <Modal isOpen={modalIsOpen} appElement={document.getElementById('root')}>
                                    질문지 등록 모달
                                    <div>
                                        <input 
                                            maxLength={45}
                                            onChange={(e)=> InputModal(e, baseData.ques, baseData.quesTitle)}
                                            placeholder="이거는 최대 45자까지 적을 수 있는 제목입니다잉[]이게 머냐하면은 말이야. 이거"
                                        />
                                    </div>
                                    <div>
                                        <form onSubmit={postData}>
                                            {
                                                qusData.map((el,ind)=>{
                                                    return (
                                                        <div key={ind}>
                                                            <p>질문{el[0]}</p>
                                                            <p>{el[1].length} / 200</p>
                                                            <input 
                                                                placeholder={el[1]} onChange={changeQuesEle(ind)}
                                                                maxLength={200}
                                                                ></input>
                                                        </div>  
                                                    )
                                                })
                                            }
                                        <button onClick={()=>setqusData([...qusData,[qusData.length+1 , '']])}>질문 추가</button>
                                        <button type="submit">저장하기</button>
                                        </form>
                                    </div>
                                    <p onClick={() => setModalIsOpen(false)}>X</p>
                                </Modal>
                        }
                        <Sidebar setPage={setPage} />
                        {
                            nowPage === "eva" ?
                                <div>
                                    <EvaList evaList={userData[baseData.roomList]} />
                                    <PageNav setNowPage={setNowPage} dataTotal={userData[baseData.roomListTotal]}/>
                                </div>
                                :
                                <div>
                                    <QuestionList queList={userData[baseData.queList]} />
                                    <PageNav setNowPage={setNowPage} dataTotal={userData[baseData.queListTotal]}/>
                                </div>
                        }
                    </div>
                    :
                    <div>
                        Loading
                    </div>
            }
        </div>
    )
}

export default Interviewer;