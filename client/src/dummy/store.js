import { configureStore, createSlice } from '@reduxjs/toolkit'

// DB 연결 전 임시 데이터 //
let user = createSlice({
    name : 'user',
    initialState : [
        {
            name : 'stud11',
            email : 'stud11@codinghub.co.kr',
            role : '/stud'
        },
        { 
            name : 'stud22', 
            email : 'stud22@codinghub.co.kr', 
            role : '/stud'
        },
        {
            name : 'stud33', 
            email : 'stud33@codinghub.co.kr', 
            role : '/stud'
        },
        {
            name : 'teach11',
            email : 'teach11@codinghub.co.kr',
            role : '/teach'
        },
        { 
            name : 'teach22', 
            email : 'teach22@codinghub.co.kr', 
            role : '/teach'
        },
        {
            name : 'teach33', 
            email : 'teach33@codinghub.co.kr', 
            role : '/teach'
        },
        {
            name : 'admin11',
            email : 'admin11@codinghub.co.kr',
            role : '/admin'
        },
        { 
            name : 'admin22', 
            email : 'admin22@codinghub.co.kr', 
            role : '/admin'
        },
        {
            name : 'admin33', 
            email : 'admin33@codinghub.co.kr', 
            role : '/admin'
        }
    ]
})

let loginUser = createSlice({
    name : 'loginUser',
    initialState : { name : '', email : '', role : '' },
    reducers : {
        saveUserInfo(state, action) {
            for(var key in action.payload){
                state[key] = action.payload[key]
            }
        }
    }
})

let room = createSlice({
    name : 'room',
    initialState : [
        {
            uuid : 1,
            roomName : 'stud11 님 사전 역량 평가',
            targetUser : 'stud11',
            startTime : '2023/02/04 14:00',
            endTime : '2023/02/04 15:00',
            createdAt : '2023/02/01 10:30',
            progress : -1
        },
        {
            uuid : 2,
            roomName : 'stud11 님 중간 역량 평가',
            targetUser : 'stud11',
            startTime : '2023/03/04 14:00',
            endTime : '2023/03/04 15:00',
            createdAt : '2023/02/01 10:30',
            progress : -1
        },
        {
            uuid : 3,
            roomName : 'stud22 님 중간 역량 평가',
            targetUser : 'stud22',
            startTime : '2023/03/04 14:00',
            endTime : '2023/03/04 15:00',
            createdAt : '2023/02/01 10:30',
            progress : -1
        }
    ]
})

export let { saveUserInfo } = loginUser.actions

export default configureStore( {
    reducer : {
        user : user.reducer,
        loginUser : loginUser.reducer,
        room : room.reducer
    }
} )


