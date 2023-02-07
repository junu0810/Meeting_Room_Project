import { useSelector } from 'react-redux';
import RoomList from './RoomList';

function Student( {navi} ) {
    let who = useSelector((state) => state.loginUser)

    return (
        <div>
            {who.name === '' ? navi('/'): ''}
            <div> {/* LOGO 영역 */} </div>
            <div>
                <h4>{who.name}님, 반갑습니다.</h4>
                <h5>필요 시 자료 업르드 확인 후 인터뷰 장으로 입장해 주세요.</h5>
            </div>
            <div>
                <RoomList user={who.name}/>
            </div>
        </div>
    )
}



export default Student;