import Select from 'react-select';


function ModlaDropDown({queList , setModalData , modalData}) {

    const setDropData =  (e) =>{        
        setModalData({...modalData , quesDocumnet : e.target.value})
    }

    console.log(queList)
    return(
        <>
        <select onChange={(value) => setDropData(value)} >
            {
                queList.map((el) => {
                   return(
                        <option value={el.uuid} key={el.uuid} >
                            {el.name}
                        </option>
                   )
                })
            }
        </select>
        </>
    )
}

export default ModlaDropDown;