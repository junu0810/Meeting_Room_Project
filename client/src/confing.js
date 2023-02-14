export const baseData ={
    URL : "http://localhost:8080" ,

    stu : "/stud" ,

    teach : "/teach" ,

    admin : "admin" ,

    stuTest : {
        data:{
            user_name : "Stu1",
            role : 1 ,
            class : [
                {
                    class_uuid: 123456123,
                    class_name: "테스트강의장 1",
                    created_at: "2023-03-01",
                    progress: 0
                },
                {
                    class_uuid: 123456123,
                    class_name: "테스트강의장 2",
                    created_at: "2023-03-20",
                    progress: 1
                },
                {
                    class_uuid: 123456123,
                    class_name: "테스트강의장 3",
                    created_at: "2023-03-15",
                    progress: -1
                }
            ]
        }
    },
    interTest : {
        data : {
            userString : "Inter1",
            role : 2 ,
            class : [
                {
                    class_uuid: 123456123,
                    class_name: "테스트강의장 1",
                    created_at: "2023-03-01",
                    progress: 0
                },
                {
                    class_uuid: 1231235423,
                    class_name: "테스트강의장 2",
                    created_at: "2023-03-20",
                    progress: 1
                },
                {
                    class_uuid: 1231251256,
                    class_name: "테스트강의장 3",
                    created_at: "2023-03-15",
                    progress: -1
                }
            ]
        }
    }
}


