
function ModlaDropDown({queList , setModalData , modalData}) {

    const setDropData = (e) =>{
        const { target : { outerText }} = e  
        const data = outerText.split("/")[0]
        setModalData({...modalData , Question : data})
        
    }
    return(
        <>
        {queList.map((el) => {
            return(
                <div onClick={setDropData} key={el.uuid} >{el.uuid} / {el.name}</div>
            )
        })}
        </>
    )
}

export default ModlaDropDown;