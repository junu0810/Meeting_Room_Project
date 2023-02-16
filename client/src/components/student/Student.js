import { useEffect, useState } from 'react';
import RoomList from './RoomList';
import axios from 'axios';
import { baseData } from '../../confing';

function Student() {

    const [userData, setData] = useState();
    const [loading, isLoading] = useState(false);
    const header = localStorage.getItem("token");

    useEffect(() => {
        async function getData() {
            await axios.get(`${baseData.URL}/user/stuinfo`, {
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

    }, [])

    return (
        <div>
            <div>
            {loading ?
                <div>
                    <div> {/* LOGO 영역 */} </div>
                    <div>
                        <h4>{userData.user_name}님, 반갑습니다.</h4>
                        <h5>필요 시 자료 업르드 확인 후 인터뷰 장으로 입장해 주세요.</h5>
                    </div>
                    <div>
                        <RoomList roomList={userData.roomList} />
                    </div>
                </div>
                :
                <div>
                    <div>Loading...</div>
                </div>
            }
            </div>
        </div>       
    )
}



export default Student;