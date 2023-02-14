import { useEffect, useState , useRef} from 'react';
import RoomList from './RoomList';

function Student( {classData} ) {
    
    const userData = useRef(classData);
    
    // 강의 정보 받아오기 데이터 최신화
    // useEffect(() => {
    //     // 
    // } , [userData])

    return (
        <div>
            
            <div> {/* LOGO 영역 */} </div>
            <div>
                <h4>{userData.user_name}님, 반갑습니다.</h4>
                <h5>필요 시 자료 업르드 확인 후 인터뷰 장으로 입장해 주세요.</h5>
            </div>
            <div>
                <RoomList />
            </div>
        </div>
    )
}



export default Student;