import Sidebar from './Sidebar';
import EvaList from './EvaList'
import QuestionList from './QuestionList'
import { useEffect, useState } from 'react';
import { baseData } from '../../confing';
import axios from 'axios';
// import Modal from '../common/Modal';
import Modal from 'react-modal';

function Interviewer({ classData }) {

    const [nowPage, setPage] = useState(baseData.inter);
    const [loading, isLoading] = useState(false);
    const [userData, setData] = useState();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const postData = ( s , thisPage) => {
        console.log(thisPage)
    }
    
    useEffect(() => {
        async function getData() {
            if(nowPage === baseData.eva){
                await axios.get(`${baseData.URL}/user/interinfo`  , {
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
            else{
                await axios.get(`${baseData.URL}/user/quest`  , {
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
        }
        getData()
    }, [nowPage])

    return (
        <div>
            {
                loading 
                ?
                <div>
                <p>평가자 인터뷰 목록</p>
                <a onClick={()=> setModalIsOpen(true)}> + </a>
                <Modal isOpen={modalIsOpen}>
                    This is Modal content
                    <button onClick={()=> setModalIsOpen(false)}>Modal Close</button>
                </Modal>
                <Sidebar setPage={setPage} />
                {
                 nowPage === "eva" ?
                    <div>
                        <EvaList evaList={userData.roomList}/>
                    </div>
                    :
                    <div>
                        <QuestionList qusList={userData.roomList} />
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