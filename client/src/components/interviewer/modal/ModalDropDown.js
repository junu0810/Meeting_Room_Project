
function ModlaDropDown({queList , setModalData , modalData}) {

    const setDropData = (uuid) => (e) =>{

        setModalData({...modalData , quesDocumnet : uuid})
    }
    return(
        <>
        {queList.map((el) => {
            return(
                <div onClick={setDropData(el.uuid)} key={el.uuid} >{el.name}</div>
            )
        })}
        </>
    )
}

export default ModlaDropDown;