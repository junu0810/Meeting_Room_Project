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
import '../style.css/interviewer/InterViewer.css';




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

    const [ nowPageNum , setNowPage ] = useState(1);

    const getTime = useRef({
        startHour: '',
        startMin : '',
        endHour : '',
        endMin : ''
    })

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
        setModalData({...modalData, queList: qusData})
        console.log(getTime.current)
        const startTime = `${getTime.current.startHour} : ${getTime.current.startMin}`
        const endTime = `${getTime.current.endHour} : ${getTime.current.endMin}`
        setModalData({...modalData, starTime : startTime , endTime : endTime})
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

    const setTime = (value , type) => {
        switch(type){
            case(baseData.startHour):
            getTime.current[baseData.startHour] = value
            break

            case(baseData.startMin):
            getTime.current[baseData.startMin] = value
            break

            case(baseData.endHour):
            getTime.current[baseData.endHour] = value
            break

            case(baseData.endMin):
            getTime.current[baseData.endMin] = value
            break
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
    console.log(modalData)
    return (

        <div className='interviewer-wrapper'>
            <div className='page-heading'>
                <a className='page-heading__logo'>
                    <svg id="logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 349.49 123.17">
                        <path
                            d="M38.67,1.87c-3.14-1.21-6.54-1.87-10.09-1.87C12.86,0,0,13.13,0,29.22s12.86,29.32,28.58,29.32c3.55,0,6.96-.66,10.09-1.87,.9-.35,1.47-1.25,1.47-2.21v-9.61c0-1.9-2.11-3.03-3.69-1.97-2.28,1.54-4.98,2.43-7.88,2.43-8.13,0-14.8-7.21-14.8-16.09s6.66-16,14.8-16c2.89,0,5.59,.89,7.88,2.43,1.57,1.06,3.69-.07,3.69-1.97V4.09c0-.97-.57-1.86-1.47-2.21Z" />
                        <path
                            d="M74.01,0c-15.72,0-28.58,13.13-28.58,29.23s12.86,29.32,28.58,29.32,28.67-13.13,28.67-29.32S89.83,0,74.01,0Zm0,45.32c-8.14,0-14.8-7.21-14.8-16.09s6.66-16,14.8-16,14.89,7.21,14.89,16-6.66,16.09-14.89,16.09Z" />
                        <path
                            d="M131.06,0h-18.06c-1.32,0-2.38,1.07-2.38,2.38V54.96c0,1.32,1.07,2.38,2.38,2.38h18.06c14.8,0,26.91-12.86,26.91-28.67S145.86,0,131.06,0Zm-.09,44.12h-4.74c-1.32,0-2.38-1.07-2.38-2.38V15.7c0-1.32,1.07-2.38,2.38-2.38h4.83c7.49,0,13.59,6.94,13.59,15.35s-6.1,15.44-13.69,15.44Z" />
                        <rect x="165.91" width="13.23" height="57.16" rx="2.38" ry="2.38" />
                        <path
                            d="M189.46,57.16h8.56c1.32,0,2.38-1.07,2.38-2.38v-21.38c0-2.33,3-3.27,4.34-1.36l16.78,24.1c.45,.64,1.18,1.02,1.95,1.02h7.19c1.32,0,2.38-1.07,2.38-2.38V2.38c0-1.32-1.07-2.38-2.38-2.38h-8.55c-1.32,0-2.38,1.07-2.38,2.38V23.56c0,2.33-3.01,3.27-4.34,1.36L198.8,1.02c-.45-.64-1.18-1.02-1.96-1.02h-7.38c-1.32,0-2.38,1.07-2.38,2.38V54.77c0,1.32,1.07,2.38,2.38,2.38Z" />
                        <path
                            d="M230.76,66.01h-8.46c-1.32,0-2.38,1.07-2.38,2.38v17.25c0,1.32-1.07,2.38-2.38,2.38h-14.84c-1.32,0-2.38-1.07-2.38-2.38v-17.25c0-1.32-1.07-2.38-2.38-2.38h-8.56c-1.32,0-2.38,1.07-2.38,2.38v52.39c0,1.32,1.07,2.38,2.38,2.38h8.56c1.32,0,2.38-1.07,2.38-2.38v-17.16c0-1.32,1.07-2.38,2.38-2.38h14.84c1.32,0,2.38,1.07,2.38,2.38v17.16c0,1.32,1.07,2.38,2.38,2.38h8.46c1.32,0,2.38-1.07,2.38-2.38v-52.39c0-1.32-1.07-2.38-2.38-2.38Z" />
                        <path
                            d="M343.92,92.11c-.52-.52-.63-1.28-.29-1.93,1.12-2.12,1.79-4.45,1.94-6.94,.56-9.51-7.55-17.32-17.07-17.32h-25.48c-.95,0-1.72,.77-1.72,1.72v53.81c0,.95,.77,1.72,1.72,1.72h27.81c10.67,0,19.62-9,18.56-19.62-.44-4.45-2.45-8.41-5.48-11.44Zm-29.39-11.25c0-.95,.77-1.72,1.72-1.72h11.78c3.11,0,5.56,3.52,3.49,6.95-.65,1.09-1.93,1.65-3.19,1.65h-12.08c-.95,0-1.72-.77-1.72-1.72v-5.16Zm16,29.08h-14.28c-.95,0-1.72-.77-1.72-1.72v-7.94c0-.95,.77-1.72,1.72-1.72h14.28c3.05,0,5.64,2.5,5.64,5.64s-2.59,5.73-5.64,5.73Z" />
                        <path
                            d="M292.55,26.84h-11.46c-.16,0-.32,.05-.45,.14h0c-.21,.15-.36,.4-.36,.68v1.91c-.02,.09-.08,.16-.08,.25v10.59c0,.7-.29,1.4-.84,1.83-2.7,2.14-6.27,3.34-9.61,3.34-8.22,0-14.98-7.21-14.98-16.18s6.75-16.19,14.98-16.19c2.42,0,4.54,.45,6.42,1.4,1.62,.82,3.53-.25,3.53-2.07V3.52c0-1.02-.64-1.96-1.62-2.27-2.68-.83-5.49-1.25-8.34-1.25-15.81,0-28.76,13.13-28.76,29.41s12.95,29.5,28.76,29.5c3.82,0,7.3-.7,10.45-2,.03-.01,.06-.03,.08-.04v18.14c0,.07,0,.12,0,.19,0,.2,.02,.4,.02,.6v20.42c0,.26,0,.52-.02,.78-.41,6.87-6.07,13.12-13.04,13.1-7.26-.02-13.07-7.01-13.07-14.27v-29.02c0-.28-.15-.53-.36-.68-.13-.09-.29-.14-.46-.14h-11.46c-.45,0-.82,.37-.82,.82l.02,31.04c0,9.27,4.83,17.4,12.1,22.04,4.05,2.6,8.87,3.28,14.04,3.28s9.99-.69,14.05-3.28c7.27-4.64,12.09-12.78,12.09-22.04V27.66c0-.45-.37-.82-.82-.82Z" />
                    </svg>
                </a>
            </div>

            <div className='page-content-wrap'>
                <Sidebar setPage={setPage} />

                <div className='page-content__list'>
                    {
                        loading
                            ?
                            <div className='page-content__interview'>
                                <div className='interview-heading'>
                                    <h4>평가자 인터뷰 목록</h4>
                                    <button onClick={() => setModalIsOpen(true)}> + </button>
                                </div>  
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
                                                    <select onChange={(value) =>setTime(value.target.value , baseData.startHour)} >
                                                {baseData.hourArray.map((el,ind) => {
                                                    return(
                                                            <option value={el} key={ind} >
                                                                {el}
                                                            </option>
                                                    )
                                                })}
                                            </select>
                                            <select onChange={(value) => setTime(value.target.value , baseData.startMin)} >
                                                {baseData.minArray.map((el,ind) => {
                                                    return(
                                                            <option value={el} key={ind} >
                                                                {el}
                                                            </option>
                                                    )
                                                })}
                                            </select>
                                                </div>
                                                <div><p onClick={() => setShowEnd(!showEnd)}>인터뷰 종료 시간</p>
                                                    <p onClick={() => setShowEnd(!showEnd)}>{viewEnd}</p>
                                                    {showEnd ?
                                                        <Calendar onChange={(e) => setChangeDate(e, baseData.evaEnd)} /> : <></>}
                                                     <select onChange={(value) =>setTime(value.target.value , baseData.endHour)} >
                                                {baseData.hourArray.map((el,ind) => {
                                                    return(
                                                            <option value={el} key={ind} >
                                                                {el}
                                                            </option>
                                                    )
                                                })}
                                            </select>
                                            <select onChange={(value) => setTime(value.target.value , baseData.endMin)} >
                                                {baseData.minArray.map((el,ind) => {
                                                    return(
                                                            <option value={el} key={ind} >
                                                                {el}
                                                            </option>
                                                    )
                                                })}
                                            </select>   
                                                </div>
                                                <div >인터뷰 질문지</div>
                                               <ModlaDropDown modalData={modalData} setModalData={setModalData} queList={userData.queList} />
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
                                
                                {
                                    nowPage === "eva" ?
                                        <div>
                                            <EvaList evaList={userData[baseData.roomList]} />
                                            <PageNav setNowPage={setNowPage}
                                                    dataTotal={userData[baseData.roomListTotal]}
                                                    onePageNum={10}     
                                            />
                                        </div>
                                        :
                                        <div>
                                            <QuestionList queList={userData[baseData.queList]} />
                                            <PageNav setNowPage={setNowPage} 
                                                    dataTotal={userData[baseData.queListTotal]}
                                                    onePageNum={9}
                                            />
                                        </div>
                                }
                            </div>
                            :
                            <div></div>
                    }
                </div>
           
            </div>
        </div>
    )
}

export default Interviewer;